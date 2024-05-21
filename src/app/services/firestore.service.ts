import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Stock } from 'src/interfaces/stock.interface';

export interface Note {
  id?: string;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  addStock(stock: Stock) {
    const stockRef = collection(this.firestore, 'stocks');
    return addDoc(stockRef, stock);
  }

  getStocks(): Observable<Stock[]> {
    const stockRef = collection(this.firestore, 'stocks');
    return collectionData(stockRef, {idField: 'id'}) as Observable<Stock[]>;
  }

  getNotes(): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Note[]>;
  }

  getNoteById(id: string): Observable<Note> {
    const noteDocRef = doc(this.firestore, `notes/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Note>;
  }

  addNote(note: Note) {
    const notesRef = collection(this.firestore, 'notes');
    return addDoc(notesRef, note);
  }

  deleteNote(note: Note) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return deleteDoc(noteDocRef);
  }

  updateNote(note: Note) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(noteDocRef, { title: note.title, text: note.text });
  }
}