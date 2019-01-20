import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../product';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

	displayedColumns: string[] = ['name', 'detail','price'];
	data: Product[] = [];
	isLoadingResults = true;
	constructor(private api: ApiService) { }

	ngOnInit() {
		this.api.getProducts()
    .subscribe(res => {
      console.log(res.data.length);
		if(res.data.length >0){
      this.data = res.data;
      this.isLoadingResults = false;
		}else{
			this.data = '';
		}
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
	}

}
