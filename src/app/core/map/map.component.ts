import { Component, OnInit,ViewChild,HostListener,NgZone  } from '@angular/core';
// import { MapsAPILoader, AgmMap } from '@agm/core';
// import {} from "googlemaps";
import { Router } from '@angular/router';
// import { MarkerClusterGroup } from 'leaflet';
import * as L from 'leaflet';
// import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
// import { MarkerClusterGroup } from "leaflet.markercluster";
//import 'leaflet.markercluster';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  latitude: any = 3.9751495447243106;
  longitude: any = 103.42072207204995;
  public zoom: number = 12;
  searchValue: any;
  berthAnchorageList: any = [];

  searchData: any = [];
  showDropDown: boolean = false;
  showDropUp1:boolean = false;
  showDropUp2:boolean = false;
  showDropUp3:boolean = false;

  viewStatus: any = [170, 150];//width,height
  multipurposeResults: any = [];
  containerResults: any = [];
  liquidBulkResults: any = [];
  newDeepWaterResults: any = [];
  colorSchemeMultipurpose:any = {
    domain: ['red']
  };
  colorSchemeContainer:any = {
    domain: ['blue']
  };
  colorSchemeLiquidBulk:any = {
    domain: ['green']
  };
  colorSchemeNewDeepWater:any = {
    domain: ['black']
  };
  berthStatus: any;

//leaflet map start
//this.zone.runOutsideAngular(() => {
  // your Leaflet code here
  //@HostListener('click', ['$event']) onClick(event:any)
//    @HostListener('document:click', ['$event']) clickout(event:any)
//  // @HostListener('document:touchend', ['$event']) clickout(event:any)
//   {
//     debugger
//     console.log(event)
//     if(event.target.classList.contains("vesName")){
//       //this.unsubscribeEventListeners();
//       event.preventDefault();
//       this.tooltipOnClick(event.visitId,event.scn); //click on marker-tooltip-link
//       event.stopPropagation();
//     }
//   }
//});

  private map:any = L.Map;
  private centroid: L.LatLngExpression = [3.979787, 103.416092];
  locations:any = [];
  // locations:any= [
  //   ["M2P1","EASTERN MERMAID", 3.979787, 103.416092,"orange"],
  //   // ["M2T3","DRAGON SEA", 3.979169, 103.416506],
  //   ["M2T4","SM-XI", 3.978326, 103.417008,"green"],
  //   // ["M2T5","vassel1", 3.977383, 103.417612],
  //   ["M2T6","vassel1", 3.976360, 103.418235,"orange"],
  //   // ["M2T7","vassel1", 3.975558, 103.418718],
  //   ["M2T8","vassel1", 3.974535, 103.419321,"green"],
  //   // ["M2T9","vassel1", 3.973712, 103.419823],
  //   ["M2T0","vassel1", 3.972609, 103.420547,"orange"],
  //   // ["M2T2","vassel1", 3.971727, 103.421050],
  //   ["M2T44","vassel1", 3.971045, 103.421492,"green"],
  //   // ["M2T45","vassel1", 3.970663, 103.421734],
  // ];
  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 13
    });
    this.markersData();
  }
  //leaflet map end


  markersData(){
    this.spinner.show();
    this.dashboardService.getBerthAnchorageData().subscribe({next:(res)=>{
      this.berthAnchorageList = res;
      this.spinner.hide();

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 10,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      //const markerCluster = new MarkerClusterGroup();

        this.berthAnchorageList.vesselBerthList.forEach((location:any)=> {
         // debugger
        if(location.latitude){
       // if(location[4]=="orange"){
            var point = L.marker([location.latitude, location.longitude],{icon: L.icon({
            ...L.Icon.Default.prototype.options,
            iconUrl: 'assets/boat1.png',//node_modules-leaflet-dist-images have to change here
            iconRetinaUrl: 'assets/boat1.png',
            shadowUrl: 'assets/marker-shadow.png'
          })
        })
       // }
        // else{
        //   var point = L.marker([location.latitude, location.longitude],{icon: L.icon({
        //     ...L.Icon.Default.prototype.options,
        //     iconUrl: 'assets/boat2.png',//node_modules-leaflet-dist-images have to change here
        //     iconRetinaUrl: 'assets/boat2.png',
        //     shadowUrl: 'assets/marker-shadow.png'
        //   })
        // })
        // }
        point.addTo(this.map);

        // point.bindTooltip(`<h6><b>Vessel Name:</b>  ${location[1]}<br/><b>SCN:</b>  ${location[0]}</h6>`).openTooltip()
        var template='<a><b>Vessel Name:</b><u style="color:blue" class="vesName">'+location.vesselName+'</u><br/><b>SCN:</b>'  +location.scn+'</a>';
        point.bindPopup(template);
        //markerCluster.addLayer(L.marker);
        point.on('click', (e) => {this.markerOnClick(e)}); //trigger when click on marker
        //L.DomEvent.on(this.map, 'click', L.DomEvent.stopPropagation);
       }
      });
      //this.map.addLayer(markerCluster);
      tiles.addTo(this.map);
    }, error: (err:any) => {
      this.spinner.hide();
      this.toastr.error(err.message, "Error Something Went Wrong");
      }
    });
  }

  constructor(
    private router: Router,
    private dashboardService : DashboardService,
    private spinner : NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initMap();
    this.dashboardService.getBerthStatusData().subscribe({next:(res:any)=>{
      this.berthStatus = res;
      this.multipurposeResults = [];this.containerResults = [];this.liquidBulkResults = [];this.newDeepWaterResults = [];
      this.multipurposeResults.push(this.berthStatus.multipurpose);
      this.containerResults.push(this.berthStatus.container);
      this.liquidBulkResults.push(this.berthStatus.liquidBulk);
      this.newDeepWaterResults.push(this.berthStatus.newDeepWater);
      this.spinner.hide();
    }, error: (err:any) => {
      this.spinner.hide();
      this.toastr.error(err.message, "Error Something Went Wrong");
      }
    });
  }

  tooltipOnClick(vesselId:any,scn:any){
    debugger
    this.router.navigate(['/core/info'], { queryParams: { vesselId : vesselId, scn:scn }});
  }

  goToInfoScreen(vesselId:any,scn:any){
    this.router.navigate(['/core/info'], { queryParams: { vesselId : vesselId, scn:scn }});
  }

  markerOnClick(event:any){
    debugger
    console.log(event)
    var index = this.berthAnchorageList.vesselBerthList.findIndex((list:any) => {return list.latitude == event.latlng.lat});
    if (index >= 1) {
      var visitId = this.berthAnchorageList.vesselBerthList[index].visitId;
      var scn = this.berthAnchorageList.vesselBerthList[index].scn;
      this.router.navigate(['/core/info'], { queryParams: { vesselId : visitId, scn:scn }});
    }
  }

  selectDrop() {
    this.showDropUp1 = true;
    this.showDropUp2 = false;
    this.showDropUp3 = false;
  }

  selectDrop1() {
    this.showDropUp2 = true;
    this.showDropUp1 = false;
    this.showDropUp3 = false;
  }

  selectDrop2() {
    this.showDropUp1 = false;
    this.showDropUp2 = false;
    this.showDropUp3 = true;
  }
  ngOnDestroy() {
    this.map.remove();
  }

  // private unsubscribeEventListeners(): void {
  //   Object.keys(this.eventListeners).forEach(
  //     (type: 'click' | 'touchend') => {
  //       (this as any).eventListeners[type]();
  //       delete this.eventListeners[type];
  //     }
  //   );
  // }

  // private unsubscribeEventListeners(): void {
  //   delete this.eventListeners['click'];
  // }
  //////////////////////////////////////////////// search start //////////////////////////////////////////
  openDropDown() {
    this.showDropDown = true;
  }
  closeDropDown() {
    this.showDropDown = !this.showDropDown;
  }
  clearValue() {
    this.searchValue = null;
    this.showDropDown = false;
    this.showDropUp1 = false;
    this.showDropUp2 = false;
    this.showDropUp3 = false;
  }
  selectValue(value:any) {
    this.showDropDown = false;
    this.searchValue = value.scn +'-'+ value.vesselName;
    this.goToInfoScreen(value.visitId,value.scn);
  }
  search(event:any) {
    var k = event.keyCode
    if (k == 8) {
      this.clearValue();
    } else {
      if (this.searchValue != null && this.searchValue.length > 1) {
          this.dashboardService.getSearchData(this.searchValue).subscribe((data:any)=>{
            this.searchData = data;
             this.openDropDown();
          })
      }
    }
  }
  //////////////////////////////////////////////////// search end ///////////////////////////////////////////////////////////
}
