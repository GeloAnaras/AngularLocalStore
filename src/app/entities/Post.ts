export class Post{
  title:string;
  text:string;
  author:string;
  date:string;

  constructor(title: string, text: string, author: string, date: string) {
    this.title = title;
    this.text = text;
    this.author = author;
    this.date = date;
  }
}
