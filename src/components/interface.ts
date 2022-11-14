interface setHtml {
  (val:string): void;
}
interface getHtml {
  (): string;
}
interface getText {
  (): string;
}
export interface EditorRef{
  setHtml: setHtml
  getHtml: getHtml
  getText: getText
  insertContent:(val:string)=>{},
  $el:Element
}

export interface ListRef{
  onRefresh:()=>{},
  $el:Element
}
