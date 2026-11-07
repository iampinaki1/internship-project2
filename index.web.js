import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('HBIntern', () => App);

const rootTag = document.getElementById('root');
if (rootTag) {
  AppRegistry.runApplication('HBIntern', {
    rootTag,
  });
}

