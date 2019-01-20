import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
	productForm: FormGroup;
	name:string='';
	detail:string='';
	price:number=null;
	updated_at:Date=null;
	created_at:Date=null;
	isLoadingResults = false;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
	  this.productForm = this.formBuilder.group({
    'name' : [null, Validators.required],
    'detail' : [null, Validators.required],
    'price' : [null, Validators.required],
    'created_at' : [],
    'updated_at' : []
  });
  }
  onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  this.api.addProduct(form)
    .subscribe(res => {
        let id = res.data.id;
        this.isLoadingResults = false;
        this.router.navigate(['/product-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
}

}
