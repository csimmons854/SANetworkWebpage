import { APP_INITIALIZER, FactoryProvider } from '@angular/core';

export const AppInit: FactoryProvider = {
    provide: APP_INITIALIZER,
    useFactory: onAppInit,
    multi: true,
};

export function onAppInit(): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise((resolve, reject) => {
            resolve();
        });
    };
}
