import django_filters
from .models import Product
from django.db import models



class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    stock_status = django_filters.BooleanFilter(method="filter_stock_status")
    category = django_filters.CharFilter(field_name="category__slug", lookup_expr="iexact")
    search = django_filters.CharFilter(method="filter_search")

    class Meta:
        model = Product
        fields = ["min_price", "max_price", "category", "stock_status", "search"]

    def filter_stock_status(self, queryset, name, value):
        if value:
            return queryset.filter(stock__gt=0)
        return queryset.filter(stock=0)

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            models.Q(name__icontains=value) |
            models.Q(description__icontains=value)
        )
