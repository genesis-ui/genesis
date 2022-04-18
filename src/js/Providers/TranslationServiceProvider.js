import {AbstractServiceProvider} from "./AbstractServiceProvider";
import translations from "../../resources/lang/index"

export class TranslationServiceProvider extends AbstractServiceProvider {

    boot() {
    }

    register() {
        for (const [locale, groupItems] of Object.entries(translations)) {
            this.addTranslations(groupItems, locale);
        }
    }
}