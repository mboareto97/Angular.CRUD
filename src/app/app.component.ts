import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { Dialog } from '../components/dialog/dialog.component';

export interface PeriodicElement {
  nome: string;
  id: number;
  infoAcesso: string;
  descricao: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, nome: 'Apple Watch', infoAcesso: 'alguma coisa', descricao: '42mm'},
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  nome: string | undefined;
  infoAcesso: string | undefined;
  descricao: string | undefined;

  constructor(public dialog: MatDialog) {}

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'infoAcesso', 'acoes'];
  dataToDisplay = [...ELEMENT_DATA];
  dataSource = new ExampleDataSource(this.dataToDisplay);

  removeData(idItem:number) {
    const removeIndex = ELEMENT_DATA.findIndex(x => x.id === idItem);
    if(removeIndex > -1)
      ELEMENT_DATA.splice(removeIndex, 1);
    this.dataSource.setData(ELEMENT_DATA);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {nome: this.nome, infoAcesso: this.infoAcesso, descricao: this.descricao},
    });

    dialogRef.afterClosed().subscribe(result => {
      ELEMENT_DATA.sort(x => x.id);

      const model:PeriodicElement = {
        id: (ELEMENT_DATA[ELEMENT_DATA.length - 1].id + 1),
        nome: result.nome,
        descricao: result.descricao,
        infoAcesso: result.infoAcesso
      };
      ELEMENT_DATA.push(model);
      this.dataSource.setData(ELEMENT_DATA);
    });
  }
}

class ExampleDataSource extends DataSource<PeriodicElement> {
  private _dataStream = new ReplaySubject<PeriodicElement[]>();

  constructor(initialData: PeriodicElement[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<PeriodicElement[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: PeriodicElement[]) {
    this._dataStream.next(data);
  }
}
