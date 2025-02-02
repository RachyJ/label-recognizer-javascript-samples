import { Component, OnInit, ViewChild } from '@angular/core';
import {LabelRecognizer} from 'dynamsoft-label-recognizer';

@Component({
  selector: 'app-image-recognizer',
  templateUrl: './image-recognizer.component.html',
  styleUrls: ['./image-recognizer.component.css']
})
export class ImageRecognizerComponent implements OnInit {
  pRecognizer = null;

  @ViewChild('ipt') ipt: any;

  async ngOnInit(): Promise<void> {
    await (this.pRecognizer = LabelRecognizer.createInstance({runtimeSettings: "numberletter"}));
  }

  recognizeImg = async (e: any) => {
    try {
      const recognizer = await this.pRecognizer;
      const results = await recognizer.recognize(e.target.files[0]);
      for(let result of results){
        for(let line of result.lineResults) {
          alert(line.text);
          console.log(line.text);
        }
      }
      (this as any).ipt.nativeElement.value = '';
    } catch (ex) {
      let errMsg: string;
      if (ex.message.includes("network connection error")) {
        errMsg = "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
      } else {
        errMsg = ex.message||ex;
      }
      console.error(errMsg);
      alert(errMsg);
    }
  }

  async ngOnDestroy() {
    if (this.pRecognizer) {
      (await this.pRecognizer).destroyContext();
      console.log('ImgRecognizer Component Unmount');
    }
  }
}
