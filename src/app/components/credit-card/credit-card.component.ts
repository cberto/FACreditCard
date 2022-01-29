import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  listCard: any[] = [
    { headline: 'Juan Perez', numberCard: '23423423324', expirationDate: '11/10', cvv: '345' },
    { headline: 'Flor Rodriguez', numberCard: '234209874', expirationDate: '1/10', cvv: '987' }
  ];
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      headline: ['', Validators.required],
      numberCard: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(15)]],
      expirationDate: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
  }

  addCard() {
    console.log(this.form)

    const credit: any = {
      headline: this.form.get('headline')?.value,
      numberCard: this.form.get('numberCard')?.value,
      expirationDate: this.form.get('expirationDate')?.value,
      cvv: this.form.get('cvv')?.value,

    }
    this.listCard.push(credit)
    this.toastr.info('La tarjeta fue actualizada con exito!', 'Tarjeta Actualizada');
    this.form.reset();

  }

  eliminarTarjeta(index: number) {
    this.listCard.splice(index, 1);
    this.toastr.error('Tajera eliminada con exito', 'Tajera eliminada')

  }

}
