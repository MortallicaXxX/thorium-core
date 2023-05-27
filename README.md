# thorium-core

https://raw.githack.com/MortallicaXxX/thorium-core/jsdom-core/Documentation/index.html

Thorium-core est une librairie JavaScript permettant de créer des composants Web avec un système de templates.

## **Installation**

Pour utiliser Thorium dans votre projet, vous pouvez l'installer via npm :

```bash
npm install thorium-core
```

Vous pouvez ensuite l'importer dans votre code JavaScript :

```tsx
import Thorium from 'thorium-core';
```

## **Utilisation**

### **Enregistrer un système de design**

Avant de pouvoir créer des composants avec Thorium, vous devez enregistrer un système de design. Un système de design définit les propriétés de base des composants que vous allez créer, comme leur nom, leurs attributs et leur structure.

Pour enregistrer un système de design, vous pouvez utiliser la méthode **`register`** de **`DesignSystem`** :

```tsx
import { DesignSystem } from 'thorium-core';

DesignSystem().register('thorium', {
  baseName: 'div',
	attr:{class : 'mon-composant'}
});
```

Dans cet exemple, nous avons enregistré un système de design appelé `**'thorium-div'**`. Ce système de design définit un composant de base nommé **`'thorium-div'`** avec un attribut de classe **`'mon-composant'`**.

### **Créer un composant**

Une fois que vous avez enregistré un système de design, vous pouvez créer des composants à partir de celui-ci. Pour créer un composant, vous pouvez utiliser la méthode **`Hook`** :

```tsx
import { Hook } from 'thorium-core';

document.body.appendChild(
  Hook({
    localName: 'mon-systeme',
    childrens: [
      {
        localName: 'p',
        attr: { text: 'Hello, world!' },
      },
    ],
  })
);
```

Dans cet exemple, nous avons créé un composant **`'mon-systeme'`** avec un enfant **`'p'`** contenant le texte **`'Hello, world!'`**. Nous avons ensuite ajouté ce composant au corps du document.

### **Composants imbriqués**

Vous pouvez également imbriquer des composants les uns dans les autres en utilisant la propriété **`childrens`** :

```tsx
import { DesignSystem, Hook } from 'thorium-core';

DesignSystem().register('thorium', {
  baseName: 'button',
  attr: { class: 'thorium-bouton' },
});

document.body.appendChild(
  Hook({
    localName: 'div',
    childrens: [
      {
        localName: 'thorium-bouton',
        attr: { text: 'Cliquez ici' },
      },
    ],
  })
);
```

Dans cet exemple, nous avons enregistré un nouveau composant **`'mon-bouton'`** et l'avons imbriqué dans un composant **`'div'`** en utilisant la propriété **`childrens`**.

### **Composants avec des attributs personnalisés**

Vous pouvez ajouter des attributs personnalisés à vos composants en utilisant la propriété **`attr`** :

```tsx
import { Hook } from 'thorium-core';

document.body.appendChild(
  Hook({
    localName: 'mon-systeme',
    attr: {
      monAttribut: 'valeur',
    },
  })
);
```

Dans cet exemple, nous avons ajouté un attribut personnalisé **`'monAttribut'`** à notre composant **`'mon-systeme'`** avec une valeur de **`'valeur'`**.

### **Connecteurs**

Les connecteurs sont des fonctions qui retournent un web component. Ils sont utiles pour encapsuler un composant existant, en y ajoutant des attributs ou des enfants, sans avoir à en étendre le comportement.

La syntaxe est la suivante :

```tsx
import { DesignSystem, Hook , Connector } from 'thorium-core';

DesignSystem().register('thorium', {
  baseName: 'button',
  attr: { class: 'thorium-bouton' },
});

const MyComponent = Connector({
  localName: 'thorium-button',
 });

const element = Hook(MyComponent());
```

Ici, nous créons un connecteur pour un composant personnalisé nommé "thorium-button".

## **Héritage de composants**

L'héritage de composants permet de définir un nouveau composant qui hérite des propriétés et du comportement d'un composant existant. Pour hériter d'un composant, vous devez utiliser la propriété **`extends`** lors de l'enregistrement de votre composant dans le système de conception.

Par exemple, si vous souhaitez hériter d'un bouton existant, vous pouvez définir votre composant comme suit :

```tsx
DesignSystem().register('thorium', {
	baseName: 'button',
  extends: 'button',
  attr: { class: 'my-button' },
});
```

Dans cet exemple, nous avons défini un composant `**thorium-button**` qui hérite des propriétés et du comportement d'un bouton standard. Nous avons également ajouté une classe **`my-button`** pour personnaliser l'apparence de notre composant.

## **Utilisation avancée**

### **Héritage de composants**

Thorium permet de définir des composants qui héritent d'autres composants existants. Pour cela, vous pouvez utiliser la clé **`extends`** dans la définition de votre composant. Voici un exemple :

```tsx
DesignSystem().register('thorium', {
  baseName: 'button',
	extend : 'button',
  attr: { class: 'my-button' },
  proto: {
    // ajoute une méthode au prototype du composant
    myMethod() {
      console.log('hello');
    },
  },
});

const MyButton = Hook({
  localName: 'thorium-button',
  attr: { myProp: 'value' },
  childrens: [
    {
      localName: 'p',
      attr: { myOtherProp: 'otherValue' , text: 'Hello' },
    },
  ],
});

document.body.appendChild(MyButton);
```

Ici, le composant **`thorium-button`** hérite des propriétés et méthodes du composant **`button`**, tout en ajoutant une classe CSS supplémentaire, **`my-button`**, et une méthode personnalisée, **`myMethod`**.

### **Enrichissement de registre**

Le registre de composants de Thorium peut être enrichi grâce à la méthode **`DesignSystem().register()`**. Cela permet de définir de nouveaux composants ou de modifier ceux qui existent déjà. Voici un exemple :

```tsx
DesignSystem().register('thorium', {
  baseName: 'container',
  attr: { class: 'thorium-container' },
	childrens: [{ localName: 'slot' }],
});

DesignSystem().register('thorium', {
  baseName: 'button',
  attr: { class: 'thorium-button' },
});

const MyContainer = Hook({
  localName: 'thorium-container',
  childrens: [{ localName: 'thorium-button' }],
});

document.body.appendChild(MyContainer());

```

Ici, nous avons ajouté deux composants au registre **`thorium`**, un **`container`** et un **`button`**, avec des classes CSS supplémentaires. Nous utilisons ensuite ces composants dans notre code en les appelant par leur nom (**`thorium-container`** et **`thorium-button`**) et en utilisant **`Hook()`** pour les instancier.

Le composant `**thorium-container**` et `**thorium-button**` maintenant disponible en HTML :

```tsx
<thorium-div>
	<thorium-button></thorium-button>
</thorium-div>
```

### **Les slots**

Les slots sont une fonctionnalité clé de Web Components. Ils permettent d'injecter des sous-composants dans un composant parent. Pour créer un slot, il suffit d'utiliser la balise **`<slot>`** dans la définition de votre composant. Voici un exemple :

```tsx
DesignSystem().register('page', {
  baseName: 'app',
  attr: {},
  childrens: [
    {
      localName: 'div',
      attr: { id: 'content' },
      childrens: [{ localName: 'slot' }],
    },
  ],
});

const MyPage = Hook({
  localName: 'page-app',
  childrens: [
    {
      localName: 'div',
      childrens: [{ localName: 'p', text: 'Hello' }],
    },
  ],
});

document.body.appendChild(MyPage());

```

Ici, nous avons défini un composant **`app`** qui inclut un slot nommé **`content`**. Nous utilisons ensuite ce composant dans notre page (**`page-app`**) et y injectons un paragraphe en utilisant **`<slot>`**.

## **Conclusion**

Dans ce guide, nous avons exploré les bases de la création de composants avec Thorium. Nous avons vu comment enregistrer des composants dans le système de conception, comment utiliser des propriétés et des hooks, et comment créer des composants hérités. Avec ces connaissances, vous pouvez commencer à créer des composants Web réutilisables et personnalisables avec Thorium.
