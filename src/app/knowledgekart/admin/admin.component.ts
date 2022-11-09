import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Discount } from '../models/discount.model';
import { AuthenticationService } from '../services/authentication-service';
import { BookOrderService } from '../services/book-order-service';
import { KnowledgeKartService } from '../services/KnowledgeKartService';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../../../assets/css/normalize.css', '../../../assets/css/vendor.css', '../../../assets/icomoon/icomoon.css', '../../../assets/style.css']
})
export class AdminComponent implements OnInit {

  discount!: Discount;
  discountSaved!: boolean;
  errorSavingDiscount!: boolean;
  reportName: any;
  reportData: any;
  reportDataReceived: boolean = false;
  
  constructor(private knowledgeKartService: KnowledgeKartService, private bookOrderService: BookOrderService, private router: Router, public fb: FormBuilder, private authService: AuthenticationService) {

  }

  reportForm = this.fb.group({
    reportName: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.reportName = "orderCountByDiscountCode";
  }

  changeReport(e: any) {
    this.reportDataReceived = false;
    this.reportName = e.target.value;
  }

  onSubmit() {

    switch (this.reportName) {
      case "orderDetails": {
        this.knowledgeKartService.getOrderDetailsReport().subscribe((data) => {
          this.reportData = data;
          this.reportDataReceived = true;
        });
        break;
      }
      case "orderCountByDiscountCode": {
        this.knowledgeKartService.getOrderCountByDiscountCodeReport().subscribe((data) => {
          this.reportData = data;
          this.reportDataReceived = true;
        });
        break;
      }
      case "orderCountByBook": {
        this.knowledgeKartService.getOrderCountByBookReport().subscribe((data) => {
          this.reportData = data;
          this.reportDataReceived = true;
        });
        break;
      }
    } 
  }

  onClickSubmit(discountForm: NgForm) {
    this.discount = new Discount();
    console.log(discountForm.value);
    console.log(discountForm.value.discountCode);
    this.discount.discountCode = discountForm.value.discountCode;
    this.discount.percentDiscount = discountForm.value.discountPercent;
    this.discount.transactionMultiplier = discountForm.value.transactionMultiplier;
    this.discount.isValid = true;
    this.knowledgeKartService.saveDiscount(this.discount).subscribe((value: any) => {
      this.discountSaved = true;
    }, error => {
      this.errorSavingDiscount = false;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

}
