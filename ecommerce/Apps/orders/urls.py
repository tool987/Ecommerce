from django.urls import path
from .views import (
    PlaceOrderAPIView,
    UserOrdersAPIView,
    OrderDetailAPIView,
    AdminUpdateOrderStatusAPIView
)

urlpatterns = [
    path("place/", PlaceOrderAPIView.as_view(), name="place-order"),
    path("my-orders/", UserOrdersAPIView.as_view(), name="my-orders"),
    path("<int:pk>/", OrderDetailAPIView.as_view(), name="order-detail"),

    # Admin
    path("admin/update-status/<int:pk>/", AdminUpdateOrderStatusAPIView.as_view(), name="admin-update-status"),
]
