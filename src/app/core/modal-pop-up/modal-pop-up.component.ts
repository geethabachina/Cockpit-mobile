import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-modal-pop-up',
  templateUrl: './modal-pop-up.component.html',
  styleUrls: ['./modal-pop-up.component.css']
})

export class ModalPopUpComponent implements OnInit {
title: any;
data: any;
lorryNo: any;
requiredShow: boolean = false;
errorMsg: any; 

  constructor(
    public modalRef: BsModalRef,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.data.phoneNo = "10-4213818";//should remove this line later
  }

  onSubmit(){
    this.modalRef.hide();
    this.router.navigate(['/logout']);
  }

  



}
