import { Component, OnInit, HostListener } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ModalServiceService } from 'src/app/shared/services/modal-service/modal-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit {
  delayTableShow: boolean = false;
  hatchTableShow: boolean = false;
  vouchersTableShow: boolean = false;
  // Phone:any = "+601154298208";
  vesselId: any;
  scn: any;
  vesselInfo: any;
  cargoInfo: any;
  agentInfo: any;
  hatchData: any;
  storageData: any;
  vochershData: any;
  delayData: any;
  equipmentData: any;
  cargoInfoOpen: boolean = false;
  agenInfoOpen: boolean = false;
  

  // https://swimlane.gitbook.io/ngx-charts/examples/bar-charts/stacked-vertical-bar-chart
  //vouchers
  // single: any = [
  //   {
  //     "name": "Created",
  //     "value": 3
  //   },
  //   {
  //     "name": "Approved",
  //     "value": 2
  //   },
  //   {
  //     "name": "Closed",
  //     "value": 3
  //   },
  //   {
  //     "name": "Cancelled",
  //     "value": 1
  //   },
  //   {
  //     "name": "Rejected",
  //     "value": 3
  //   },
  //   {
  //     "name": "Open",
  //     "value": 2
  //   },
  // ];
  viewVouchers: any = [250, 210];//width,height
  isDoughnut: boolean = true;
  colorSchemeVouchers:any = {
    // domain: ['#e3b800','#d07920','#41aea9','#5f2940']
    //domain: ["#EABF91", "#AF7067", "#CD8D85", "#F9F5D2"]
    // domain: ["#5EBAE2", "#E77ADD", "#90C74E","#C35B5B"]
    // domain: [ "#4D516A", "#CE4A4A", "#9BEA8D","#5EBAE2", "#e3b800", "#E77ADD"]
    domain: ["#5EBAE2", "#9BEA8D","#4D516A", "#CE4A4A","#E77ADD","#e3b800"]
    //  domain: ["#562F88", "#5EBAE2", "#E77ADD", "#AAAAAA", "#90C74E","#C0A7E0","#C35B5B"]
  };


  //Storage
  // declaredResults = [
  //   { name: "Declared", value: 2149.319,total:2149.319 },
  // ];
  // handledResults = [
  //   { name: "Handled", value: 5000,total:9000 },
  // ];
  // receivingResults = [
  //   { name: "Receiving", value: 9000,total:10000 },
  // ];
  // balanceResults = [
  //   { name: "Balance", value: 4000,total:9000 },
  // ];
  declaredResults: any = [];
  handledResults: any = [];
  receivingResults: any = [];
  balanceResults: any = [];
  viewStorage: any = [150, 150];//width,height
  colorSchemeDeclared:any = {
    domain: ['red']
  };
  colorSchemeHandled:any = {
    domain: ['blue']
  };
  colorSchemeReceiving:any = {
    domain: ['green']
  };
  colorSchemeBalance:any = {
    domain: ['black']
  };


  //equipment
  // equipmentResults: any = [
  //   {
  //     "name": "Gross TPGH",
  //     "value": 80
  //   },
  // ];
  equipmentResults: any;
  equipmentView: any = [300, 200];//width,height
  equipmentLegendShow: boolean = false;

  // options
  gradient: boolean = true;
  //showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme:any = {
    domain: ['#cca700', '#ea5c00']
  };


  single1: any = [
    {
      "name": "Gross TPGH",
      "value": 80
    },
    {
      "name": "Nett TPGH",
      "value": 50
    },
  ];
  view1: any = [300, 250];
  legend: boolean = true;
  legendPosition: any = 'below';

  colorScheme1: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  single2: any = [
    {
      "name": "Service Request",
      "value": 80
    },
  ];

  // @HostListener('document:click', ['$event']) 
  // clickout(event:any) 
  // { 
  //   if(event.target.classList.contains("logout")||event.target.classList.contains("fa-sign-out")){
  //     event.preventDefault();
  //     this.logout();
  //     event.stopPropagation();
  //   }
  // }

  constructor(
    private modalService2: ModalServiceService,
    private route: ActivatedRoute,
    private dashboardService : DashboardService,
    private spinner : NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.scn = params['scn'];
      this.vesselId = params['vesselId'];
    })
    this.spinner.show();
    this.dashboardService.getVesselData("ff80808176094d6b017622a087dd0920").subscribe({next:(res:any)=>{
      this.vesselInfo = res;
      this.spinner.hide();
    },
    error: (err:any) => {
      this.spinner.hide();
      this.toastr.error(err.message, "Error Something Went Wrong");
      }
    });
  }

  // formatDataLabel(value:any )
  // {
  //   return value + '%';
  // }

  // pieTooltipText() {
  //   return `
  //     <span class="tooltip-label">abc</span>
  //     <span class="tooltip-val">100</span>
  //   `;
  // }

  cargoInfoClick(){
    this.cargoInfoOpen = !this.cargoInfoOpen;
    this.agenInfoOpen = false;
    if(this.cargoInfoOpen){
      this.spinner.show();
      this.dashboardService.cargoInfo("ff8080814fcf037a014fd16a70971138").subscribe({next:(res:any)=>{
        this.cargoInfo = res;
        this.spinner.hide();
      }, error: (err:any) => {
        this.spinner.hide();
        this.toastr.error(err.message, "Error Something Went Wrong");
        }
      });
    }
  }

  agentInfoClick(){
    this.agenInfoOpen = !this.agenInfoOpen;
    this.cargoInfoOpen = false;
    if(this.agenInfoOpen){
      this.spinner.show();
      this.dashboardService.agentInfo("ff8080814ff48143014ff4db55ea0023").subscribe({next:(res:any)=>{
        this.agentInfo = res;
        this.spinner.hide();
      }, error: (err:any) => {
        this.spinner.hide();
        this.toastr.error(err.message, "Error Something Went Wrong");
        }
      });
    }
  }

  delayRowClick(){
    this.delayTableShow = true;
  }

  hatchInfoClick(){
    this.hatchTableShow = true;
  }

  vouchersInfoClick(){
    this.vouchersTableShow = true;
  }

  tabClick(btnName:any){
    this.hatchTableShow = false;
    this.vouchersTableShow = false;
    if(btnName=='hatch'){
      this.hatchTabClick();
    }
    else if(btnName=='vochers'){
      this.vochersTabClick();
    }
    else if(btnName=='storage'){
      this.storageTabClick();
    }
    else if(btnName=='equipment'){
      this.equipmentTabClick();
    }
    else if(btnName=='delay'){
      this.delayTabClick();
    }
  }

  hatchTabClick(){
    this.spinner.show();
    this.dashboardService.hatchData("ff8080814fd542d3014fda8c5981046f").subscribe({next:(res:any)=>{
      this.hatchData = res;
      this.spinner.hide();
    }, error: (err:any) => {
      this.spinner.hide();
      this.toastr.error(err.message, "Error Something Went Wrong");
      }
    });
  }

  vochersTabClick(){
    this.spinner.show();
    this.dashboardService.vochersData("ff80808186fe3e2801870c19f7d4054b").subscribe({next:(res:any)=>{
      this.vochershData = res;
      this.spinner.hide();
    }, error: (err:any) => {
      this.spinner.hide();
      this.toastr.error(err.message, "Error Something Went Wrong");
      }
    });
  }

  delayTabClick(){
    this.spinner.show();
    this.dashboardService.delayData("ff80808186fe3e2801870c19f7d4054b").subscribe({next:(res:any)=>{
      this.delayData = res;
      this.spinner.hide();
    }, error: (err:any) => {
      this.spinner.hide();
      this.toastr.error(err.message, "Error Something Went Wrong");
      }
    });
  }

  storageTabClick(){
    this.spinner.show();
    this.dashboardService.storageData("ff8080815013696a015017d905f9046d").subscribe({next:(res:any)=>{
      this.storageData = res;
      this.declaredResults = [];this.handledResults = [];this.receivingResults = [];this.balanceResults = [];
      this.declaredResults.push(this.storageData.declaredResult);
      this.handledResults.push(this.storageData.handledResult);
      this.receivingResults.push(this.storageData.receivingResult);
      this.balanceResults.push(this.storageData.balanceResult);
      this.spinner.hide();
    }, error: (err:any) => {
      this.spinner.hide();
      this.toastr.error(err.message, "Error Something Went Wrong");
      }
    });
  }

  equipmentTabClick(){
    this.spinner.show();
    this.dashboardService.equipmentData("ff8080814fe00107014feda16a660649").subscribe({next:(res:any)=>{
      this.equipmentData = res;
      this.equipmentResults = [
        {
          "name": "Gross TPGH",
          //"value": 11
           "value": this.equipmentData.totalEquipment
        }
      ];
      this.spinner.hide();
    }, error: (err:any) => {
      this.spinner.hide();
      this.toastr.error(err.message, "Error Something Went Wrong");
      }
    });
  }


  openCall(type:any){
    //not agent info wic info have to pass
    var phoneNo;
    var personName;
    if(type=="shipping"){
      phoneNo = this.agentInfo.shippingAgent.phone;
      personName = this.agentInfo.shippingAgent.name;
    }
    else if(type=="stevedore"){
      phoneNo = this.agentInfo.stevedore.phone;
      personName = this.agentInfo.stevedore.name;
    }
    else {
      phoneNo = this.agentInfo.tally.phone; //tally
      personName = this.agentInfo.tally.name;
    }
    if(phoneNo){
      var data = {phoneNo:phoneNo,name:personName};
      this.modalService2.openModal('call', data);
    }
  }

  back(){
    this.router.navigate(['/core/map']);
  }

  logout(){
    //event.stopPropagation();
    //this.router.navigate(['/logout']);
    this.modalService2.openModal('logout', '');
  }

  // onSelect(data:any): void {
  //   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  // }

  // onActivate(data:any): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // onDeactivate(data:any): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }

}
