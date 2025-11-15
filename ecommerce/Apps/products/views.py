from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend

from .models import Product
from .serializers import ProductSerializer
from .filters import ProductFilter


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.select_related("category").all()
    serializer_class = ProductSerializer

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_class = ProductFilter
    search_fields = ["name", "description"]
    ordering_fields = ["price", "rating", "created_at"]
    ordering = ["-created_at"]


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.select_related("category").all()
    serializer_class = ProductSerializer
    lookup_field = "slug"
