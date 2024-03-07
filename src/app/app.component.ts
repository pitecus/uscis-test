import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import questionsJson from './questions.json';

interface Question {
  section: string,
  subsection: string;
  subsectionItem: string;
  question: string;
  questionId: number,
  answers: string[],
  notes?: string[]
};

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {

  public showAnswer = false;

  public readonly questions: Question[] = [];

  public readonly rightAnswers: Question[] = [];
  public readonly wrongAnswers: Question[] = [];

  public currentQuestion: Question;

  public stateForm = new FormGroup({
    state: new FormControl(
      'nj',
      {
        nonNullable: true
      }
    )
  });

  public constructor() {
    // Loop through the questions
    questionsJson.forEach(section => {
      section.questions.forEach(subsection => {
        subsection.questions.forEach(question => {
          this.questions.push({
            section: section.name,
            subsection: subsection.name,
            answers: question.answers,
            question: question.question,
            questionId: question.id,
            subsectionItem: subsection.item,
            notes: question.notes
          })
        });
      })
    });

    // Trigger next question
    this.currentQuestion = this.getNextQuestion();
  }

  public toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }

  public rightAnswer() {
    this.rightAnswers.push(this.currentQuestion);

    if (this.questions.length > 0) {
      this.currentQuestion = this.getNextQuestion();
    }
  }

  public wrongAnswer() {
    this.wrongAnswers.push(this.currentQuestion);

    if (this.questions.length > 0) {
      this.currentQuestion = this.getNextQuestion();
    }
  }

  private getNextQuestion() {
    return this.questions.splice(Math.floor(Math.random() * this.questions.length), 1)[0];
  }
}
