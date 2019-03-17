import Polyglot from 'node-polyglot';

class TranslationApp {
  constructor() {
    this.polyglot = new Polyglot();
    //localStorage.removeItem('localeData');
    console.log(localStorage.getItem('localeData'))
    this.currentLocale = localStorage.getItem('localeData') || this.polyglot.locale('ja');
    this.updateLocale = this.updateLocale.bind(this);
  }

  setup() {
    /* 
      現在のLocaleに合わせて、polyglotにメッセージをセットします。
      メッセージのセットにはpolyglot.extend()を利用します。
    */
    if (this.currentLocale == 'ja') {
      this.polyglot.extend({'hello_world': 'こんにちは、世界'});
    }
    if (this.currentLocale == 'en') {
      this.polyglot.extend({'hello_world': 'Hello,World'});
    }
  }

  updateLocale(e) {
    /*
      ボタンにセットされたdata-localeを元に現在のlocaleを変更します。
    */
    const locale = e.target.dataset.locale;
    this.currentLocale = locale;
    localStorage.setItem('localeData', locale);
    this.setup();
    this.showMessage();
  }

  showMessage() {
    /*
      mainというidがセットされた要素の下にh1タグで現在のlocaleに応じて、メッセージを表示します。 
    */
    const mainEl = document.getElementById('main');
    mainEl.innerHTML = `
      <h1>${this.polyglot.t('hello_world')}</h1>
    `
  }
  
}

{
  const app = new TranslationApp;

  const button1 = document.getElementById('button1');
  button1.addEventListener('click', app.updateLocale);
  
  const button2 = document.getElementById('button2');
  button2.addEventListener('click', app.updateLocale);

  app.setup();
  app.showMessage();
}