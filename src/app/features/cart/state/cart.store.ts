import { Injectable, signal, computed } from "@angular/core";
import { Product } from "../../products/models/product.model";

export interface CartItem {
    product: Product;
    quantity: number;
}

@Injectable({ providedIn: "root" })
export class CartStore {
    // State
    private readonly _items = signal<CartItem[]>([]);

    // Selectors
    readonly items = computed(() => this._items());

    readonly totalItems = computed(() =>
        this._items().reduce((sum, item) => sum + item.quantity, 0)
    );

    readonly totalPrice = computed(() =>
        this._items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    );

    readonly isEmpty = computed(() => this._items().length === 0);

    // Actions
    addItem(product: Product, quantity: number = 1): void {
        const existingItem = this._items().find(item => item.product.id === product.id);
        if (existingItem) {
            this._items.update(items =>
                items.map(item => item.product.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                )
            );
        } else {
            this._items.update(items => [...items, { product, quantity }]);
        }
    }

    removeItem(productId: number): void {
        this._items.update(items => items.filter(item => item.product.id !== productId));
    }

    updateQuantity(productId: number, quantity: number): void {
        if (quantity <= 0) {
            this.removeItem(productId);
            return;
        }
        this._items.update(items =>
            items.map(item => item.product.id === productId ? { ...item, quantity } : item )
        );
    }

    clearCart(): void {
        this._items.set([]);
    }
}