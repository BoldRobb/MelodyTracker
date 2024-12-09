import { Injectable } from '@angular/core';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class GoogleGeminiProService {
  generationConfig = {
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      },
    ],
    temperature: 0.9,
    top_p: 1,
    top_k: 32,
    maxOutputTokens: 100, // limit output
  };

  readonly #API_KEY = 'AIzaSyDrFMvd5Z1TFrXLnzZ8uX_NctKsUtGaFko';
  readonly #genAI = new GoogleGenerativeAI(this.#API_KEY);
  readonly #model = this.#genAI.getGenerativeModel({
    model: 'gemini-pro',
    ...this.generationConfig,
  });

  async verifyReviewCorrectContent(review: string): Promise<string> {
    console.log(review);
    // Usar comillas invertidas para interpolar correctamente la variable review
    let prompt = `Tengo este texto: "${review}". Dime si ese texto contiene groserías, si sí devuelve false, si no contiene groserías devuelve true. OJO: El texto puede decir críticas constructivas como: 'La verdad esta canción me parece muy mala' y eso estaría bien, pero si dice palabras obscenas estaría mal. SOLO DEVUELVE True O False`;

    try {
        const { response } = await this.#model.generateContent(prompt);
        return response.text();
    } catch (error) {
        console.error(error);
        return 'An error has occurred. Please try again.';
    }
}



  async verifyNameList(nameList: string): Promise<string> {
    console.log(nameList);
    // Usando comillas invertidas para interpolación correcta
    let prompt = `Tengo este texto: "${nameList}". Dime si ese texto contiene groserías. Si sí, devuelve false. Si no contiene groserías, devuelve true. Si dice palabras obscenas, estaría mal. SOLO DEVUELVE True O False`;

    try {
        const { response } = await this.#model.generateContent(prompt);
        return response.text();
    } catch (error) {
        console.error(error);
        return 'An error has occurred. Please try again.';
    }
}



  async verifyDescriptionList(description: string): Promise<string> {
    console.log(description);
    let prompt = `Verifica si la siguiente descripción contiene alguna grosería (SOLO GROSERÍAS POR FAVOR, NADA MAS GROSERIAS, NADA MAS): "${description}". Devuelve "true" si es limpia, "false" si tiene groserías.`;

    try {
        const { response } = await this.#model.generateContent(prompt);
        return response.text().trim();
    } catch (error) {
        console.error(error);
        return 'An error has occurred. Please try again.';
    }
  }


  async verifyBiography(biography: string): Promise<string> {
    console.log(biography);
    let prompt = `Verifica si la siguiente biografía contiene palabras o frases groseras o inapropiadas. Solo responde "true" si no hay groserías o "false" si la biografía contiene alguna grosería. La biografía es: "${biography}".`;

    try {
        const { response } = await this.#model.generateContent(prompt);
        return response.text().trim();
    } catch (error) {
        console.error(error);
        return 'Hubo un error al verificar la biografía. Por favor, inténtalo nuevamente.';
    }
}





}