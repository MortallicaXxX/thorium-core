# Thorium DesignSystem

Le **`DesignSystem`** de Thorium permet l'enregistrement et la gestion des composants personnalisés. Il offre des fonctionnalités avancées pour la création, la manipulation et la gestion des éléments personnalisés dans une application web.

## **Fonctionnalités principales**

Le **`DesignSystem`** propose les fonctionnalités suivantes :

### **1. Enregistrement de composants personnalisés**

Le **`DesignSystem`** vous permet d'enregistrer des composants personnalisés avec différentes configurations. Vous pouvez créer des composants personnalisés en utilisant l'interface **`DesignPatern`**. Chaque composant personnalisé enregistré est associé à un type spécifique, tel que "page", "thorium", "local" ou "views".

Exemple d'enregistrement d'un composant personnalisé :

```tsx
import { register, DesignPatern } from 'thorium/design-system';

const MyComponent: DesignPatern<MyComponentType> = {
  // Configuration du composant personnalisé
  // ...
};

register('local', MyComponent);
```

### **2. Gestion des transactions**

Le **`DesignSystem`** permet d'activer et de gérer des transactions spécifiques pour les composants personnalisés. Les transactions sont des opérations spéciales qui peuvent être effectuées sur un composant personnalisé. Vous pouvez utiliser les méthodes **`useTransaction`**, **`addTransaction`** et **`removeTransaction`** pour manipuler les transactions.

Exemple d'utilisation des transactions :

```tsx
import { CustomElement } from 'thorium/design-system';

const myElement: CustomElement<MyComponentType> = document.createElement('local-my-component');

// Activation d'une transaction spécifique
myElement.useTransaction('transactionName');

// Ajout d'une transaction au contrôleur Thorium
const transactionId = myElement.addTransaction();

// Suppression d'une transaction du contrôleur Thorium
myElement.removeTransaction(transactionId);
```

### **3. Gestion des effets**

Le **`DesignSystem`** permet d'activer et de gérer des effets spécifiques pour les composants personnalisés. Les effets sont des fonctionnalités spéciales qui peuvent être appliquées à un composant personnalisé. Vous pouvez utiliser les méthodes **`useEffect`**, **`addEffect`** et **`removeEffect`** pour manipuler les effets.

Exemple d'utilisation des effets :

```tsx
import { CustomElement } from 'thorium/design-system';

const myElement: CustomElement<MyComponentType> = document.createElement('local-my-component');

// Activation d'un effet spécifique
myElement.useEffect('effectName');

// Ajout d'un effet au contrôleur Thorium
const effectId = myElement.addEffect();

// Suppression d'un effet du contrôleur Thorium
myElement.removeEffect(effectId);
```

### **4. Observateurs d'attributs**

Le **`DesignSystem`** vous permet d'ajouter des observateurs pour surveiller les modifications d'attributs des composants personnalisés. Vous pouvez utiliser la méthode **`on`** pour attacher un observateur à un attribut spécifique.

Exemple d'utilisation des observateurs d'attributs :

```tsx
import { CustomElement } from 'thorium/design-system';

const myElement: CustomElement<MyComponentType> = document.createElement('local-my-component');

// Ajout d'un observateur pour l'attribut "myAttribute"
myElement.on('myAttribute', (newValue, oldValue) => {
  // Réagir aux modifications de l'attribut
});
```

### **5. Manipulation du DOM**

Le **`DesignSystem`** vous permet de manipuler le DOM en utilisant les fonctionnalités fournies. Vous pouvez accéder aux éléments du DOM à l'aide des méthodes **`query`**, **`queryAll`**, **`append`**, **`prepend`**, **`remove`**, etc.

Exemple de manipulation du DOM :

```tsx
import { CustomElement } from 'thorium/design-system';

const myElement: CustomElement<MyComponentType> = document.createElement('local-my-component');

// Recherche d'un élément du DOM
const targetElement = myElement.query('.target-element');

// Ajout d'un nouvel élément au DOM
myElement.append('<div>Nouvel élément</div>');

// Suppression d'un élément du DOM
myElement.remove(targetElement);
```