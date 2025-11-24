from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Order, OrderItem
from .serializers import OrderSerializer
from products.models import Product
from tasks import send_order_email_task  # Celery task

class PlaceOrderAPIView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        cart_items = request.data.get("items", [])
        if not cart_items:
            return Response({"error": "Cart is empty"}, status=400)

        total_price = 0
        order = Order.objects.create(
            user=request.user,
            total_price=0
        )

        for item in cart_items:
            product_id = item["product_id"]
            quantity = int(item["quantity"])

            product = Product.objects.get(id=product_id)
            price = product.price * quantity
            total_price += price

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=product.price
            )

        order.total_price = total_price
        order.save()

        # Background task
        send_order_email_task.delay(order.id)

        return Response(OrderSerializer(order).data, status=201)


class UserOrdersAPIView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by("-created_at")


class OrderDetailAPIView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


# For Admin (optional)
class AdminUpdateOrderStatusAPIView(generics.UpdateAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    permission_classes = [permissions.IsAdminUser]
