import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

// datepie
import { DatePipe } from '@angular/common';

// Excel
import { Workbook } from 'exceljs';

import * as fs from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

import { Ticket } from '../models/ticket.model';
import { CargarTickets } from '../interfaces/cargas-tickets.interfaces';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  //public ticket: Ticket;
  public tickets: Ticket[] = [];
  constructor(
    private datePipe: DatePipe,
    private http: HttpClient ) {  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  json_data=[{
		"name": "Raja",
		"age": 20
	},
	{
		"name": "Mano",
		"age": 40
	},
	{
		"name": "Tom",
		"age": 40
	},
	{
		"name": "Devi",
		"age": 40
	},
	{
		"name": "Mango",
		"age": 40
	}
]

  generateExcel() {
    const url = `${ base_url }/tickets_lista_rp`;
    const temporal = this.http.get<any>( url, this.headers )
    .subscribe( ( ticket ) =>{
      //console.log(ticket);
      this.tickets = ticket;
      console.log(this.tickets);

      // creando instancia del excel
    //let workbook = new Workbook();

    // agregando nombre al excel
    //let worksheet = workbook.addWorksheet("Reporte de tickets");

    //
    const title = 'Titulo demo';
    const header = ['Year', 'Month', 'Make', 'Model', 'Quantity', 'Pct'];

    // const data = [
    //   [2007, 1, 'Volkswagen ', 'Volkswagen Passat', 1267, 10],
    //   [2007, 1, 'Toyota ', 'Toyota Rav4', 819, 6.5],
    // ];

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tickets);
    const workbook: XLSX.WorkBook = { Sheets: { 'Reporte de tickets': worksheet }, SheetNames: ['Reporte de tickets'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //this.saveAsExcelFile(excelBuffer, excelFileName);

    //private saveAsExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([excelBuffer], {type: EXCEL_TYPE});
      fs.saveAs(data, 'ReporteTickets' + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
   //}

  });


    //console.log(temporal);


    //add column name
    // let header=["Name","Age"]
    // let headerRow = worksheet.addRow(header);

    // for (let x1 of this.json_data)
    // {
    //   let x2=Object.keys(x1);
    //   let temp=[]
    //   for(let y of x2)
    //   {
    //     temp.push(x1[y])
    //   }
    //   worksheet.addRow(temp)
    // }

    // //set downloadable file name
    // let fname="Emp Data Sep 2020"

    // //add data and file name and download
    // workbook.xlsx.writeBuffer().then((data) => {
    //   let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //   fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    // });

  }
}
