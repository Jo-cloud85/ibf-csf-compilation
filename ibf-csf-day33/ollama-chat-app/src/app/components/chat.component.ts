import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OllamaService } from '../services/ollama.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages : Message[] = []
  messageSent : boolean = false;
  messageForm !: FormGroup;

  constructor(private fb: FormBuilder, 
              private ollamaService: OllamaService) { }

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      text: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
    })
  };

  sendMessage() {
    console.log("Sending...");
    if(this.messageForm.valid){
      const text = this.messageForm.value.text;
      console.log('User: ' + text);
      this.messages.push({text: text, sender: 'User', timestamp: new Date()});
      this.messageSent = true;
      this.ollamaService.chatwithOllama(text).then((response) => {
        this.messages.push({text: response, sender: 'Ollama', timestamp: new Date()});
        this.messageSent = false;
      });

      this.messageForm.reset();
    }
  }
}
