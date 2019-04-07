export class DateFormatter {
  private formato: string;
  private abbrMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  private abbrDays = ['Dom', 'Lun', 'Mar', 'Mier', 'Juev', 'Vier', 'Sab'];

  public format(date: Date, format: string): string {
    this.formato = '';

    if (format === 'MMMM YYYY') {
      this.formato = this.abbrMonths[date.getMonth()] + ' ' + date.getFullYear();
    }

    if (format === 'EEEE') {
      this.formato = this.abbrDays[date.getDay()];
    }

    if (format === 'DD' ) {
      this.formato = date.getDate().toString();
    }

    if (format === 'dd' ) {
      this.formato = this.abbrDays[date.getDay()];
    }
    if (format === 'MMMM' ) {
      this.formato = this.abbrMonths[date.getMonth()];
    }

    if (format === 'YYYY' ) {
      this.formato = date.getFullYear().toString();
    }

    if (this.formato === '') {
    }

    return this.formato;
  }
}
