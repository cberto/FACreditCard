import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  listCard: any[] = [

  ];
  form: FormGroup;
  accion = 'Agregar';
  id: number | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _cardService: CardService) {
    this.form = this.fb.group({
      headline: ['', Validators.required],
      numberCard: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(15)]],
      expirationDate: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.getCard();
  }
  getCard() {
    this._cardService.getListCard().subscribe(data => {
      console.log(data);
      this.listCard = data;
    }, err => console.error(err))
  }
  saveCard() {
    //console.log(this.form)

    const card: any = {
      headline: this.form.get('headline')?.value,
      numberCard: this.form.get('numberCard')?.value,
      expirationDate: this.form.get('expirationDate')?.value,
      cvv: this.form.get('cvv')?.value,

    }
    if (this.id == undefined) {
      this._cardService.saveCard(card).subscribe(data => {

        this.toastr.success('La tarjeta fue actualizada con exito!', 'Tarjeta Actualizada');
        this.getCard();
        this.form.reset();
      }, err => {
        this.toastr.error('Ha ocurrido un error!', 'Error')
        console.log(err);
      })
    } else {
      card.id == this.id;
      this._cardService.updateCard(this.id, card).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('Tarjeta actualizada', 'Tarjeta actualizada');
        this.getCard();
      }, error => {
        console.log(error);
      })
    }

    //this.listCard.push(credit)

  }

  deleteCard(id: number) {
    // this.listCard.splice(index, 1);
    this._cardService.deleteCard(id).subscribe(data => {

      this.toastr.error('Tajera eliminada con exito', 'Tajera eliminada');
      this.getCard();
    }, err => {
      console.log(err);
    })

  }

  editCard(card: any) {
    this.accion = 'Editar';
    this.id = card.id;

    this.form.patchValue({
      headline: card.headline,
      numberCard: card.numberCard,
      expirationDate: card.expirationDate,
      cvv: card.cvv,
    })

  }

}
