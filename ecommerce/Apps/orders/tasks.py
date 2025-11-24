from celery import shared_task
from django.core.mail import send_mail
from .models import Order

@shared_task
def send_order_email_task(order_id):
    try:
        order = Order.objects.get(id=order_id)
        user_email = order.user.email

        send_mail(
            "Order Confirmation",
            f"Your order #{order.id} has been placed successfully!",
            "no-reply@eshop.com",
            [user_email],
            fail_silently=True,
        )

    except Order.DoesNotExist:
        pass
