
export class Formatter {
    static formatDate(date: Date): string {
        return Intl.DateTimeFormat("pt-br").format(date)
    }

    static formatCurrency(price: number): string {
        return Intl.NumberFormat('pt-br', { currency: "brl", style: "currency" }).format(price);
    }
}

