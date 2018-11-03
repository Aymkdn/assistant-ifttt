# assistant-ifttt

Ce plugin de [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/) permet d'enclencher une action **WebHooks** sur IFTTT.

## Installation

Si vous n'avez pas installé [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/), alors il faut le faire, et sélectionner **ifttt** comme plugin.

Si vous avez déjà installé [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/), et que vous souhaitez ajouter ce plugin, alors :
  - Pour Windows, télécharger [`install_ifttt.bat`](https://github-proxy.kodono.info/?q=https://raw.githubusercontent.com/Aymkdn/assistant-ifttt/master/install_ifttt.bat&download=install_ifttt.bat) dans le répertoire `assistant-plugins`, puis l'exécuter en double-cliquant dessus.  
  - Pour Linux/MacOS, ouvrir une console dans le répertoire `assistant-plugins` et taper :  
  `npm install assistant-ifttt@latest --save --loglevel error && npm run-script postinstall`

## Configuration

Se rendre dans le [maker WebHooks de IFTTT](https://ifttt.com/maker_webhooks/settings) et le configurer. Une clé (*key*) vous sera alors donnée (qui ressemble à *dph-Wyhz1Zxlw89WZchMAV*).

![capture](https://user-images.githubusercontent.com/946315/33517365-63c50b82-d783-11e7-8c25-c041dff04d15.png)

Éditer le fichier `configuration.json` du répertoire `assistant-plugins` afin d'y mettre la clé dans la section concernant le plugin `ifttt`. Exemple :
```javascript
{
  ...
  {
    "plugins": {
      "ifttt": {
        "key":"dph-Wyhz1Zxlw89WZchMAV"
      }
    }
  }
}

```

## Utilisation

Vous pouvez relier des plugins ensembles en déclenchant des actions sur IFTTT.

### Exemple

Un exemple concret sera plus parlant. Supposons qu'on veuille dire *OK Google, éteins toutes les lumières dans X minutes*.

On procédera ainsi :

  1. Création d'un applet WebHooks IFTTT qui se déclenche sur la commande `AllLightsOff` et qui va se connecter à Philipps Hue pour éteindre toutes les lampes  
  2. Création d'un applet Google Assistant (*Say a phrase with both a number and a text ingredient*) avec la phrase de déclenchement : "éteins toutes les lumières dans # $"  
  Cet applet enverra à Pushbullet une note avec le titre "Assistant" et le message : `wait_\{\{NumberField\}\} \{\{TextField\}\}|ifttt_AllLightsOff`

Si on décortique la commande envoyée à Pushbullet :
  - `wait_\{\{NumberField\}\} \{\{TextField\}\}` → cela déclenche le plugin `assistant-wait` qui permet de mettre un timer de `NumberField` `TextField` (par exemple "3 minutes")
  - `|` → le *pipe* permet de distinguer les différentes commandes
  - `ifttt_AllLightsOff` → cela déclenche le plugin `assistant-ifttt` qui va mettre en route le WebHook `AllLightsOff` créé à l'étape 1 et donc éteindre toutes les lumières
