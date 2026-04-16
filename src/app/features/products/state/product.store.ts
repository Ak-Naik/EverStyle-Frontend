import { Injectable, signal, computed } from '@angular/core';
import { Product, ProductFilter } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductStore {
    // State
    private readonly _products = signal<Product[]>([]);
    private readonly _loading = signal<boolean>(false);
    private readonly _error = signal<string | null>(null);
    private readonly _filter = signal<ProductFilter>({});
    private readonly _selectedProduct = signal<Product | null>(null);

    // Selectors (readonly computed)
    readonly products = computed(() => this._products());
    readonly loading = computed(() => this._loading());
    readonly error = computed(() => this._error());
    readonly selectedProduct = computed(() => this._selectedProduct());

    readonly filteredProducts = computed(() => {
        const filter = this._filter();
        return this._products().filter(p => {
            if (filter.category && p.category !== filter.category) return false;
            if (filter.minPrice && p.price < filter.minPrice) return false;
            if (filter.maxPrice && p.price > filter.maxPrice) return false;
            if (filter.rating && p.rating < filter.rating) return false;
            return true;
        });
    });

    // Actions
    setProducts(products: Product[]): void {
        this._products.set(products);
    }

    setLoading(loading: boolean): void {
        this._loading.set(loading);
    }

    setError(error: string | null): void {
        this._error.set(error);
    }

    setFilter(filter: ProductFilter): void {
        this._filter.set(filter);
    }

    selectProduct(product: Product | null): void {
        this._selectedProduct.set(product);
    }
}
