import { useState } from 'react';
import './App.css';
import useOpaWasm from './useOpaWasm';

function App() {
  // load wasm from the bundle server
  const { policy } = useOpaWasm("http://localhost:8182");

  // store evaluation result
  const [info, setInfo] = useState({ text: '', color: '', input: {} });

  // check permission against requested input
  const check = (role, action, object, userId, resource) => {
    const input = {
      subject: {
        id: userId,
        roles: [role],
      },
      action,
      object,
      resource,
    };
    const result = policy.evaluate(input);

    const allow = result?.[0]?.result;
    if (allow) {
      setInfo({ text: `As ${userId} with ${role} role, you can ${action} ${object}`, color: 'green', input });
    } else {
      setInfo({ text: `As ${userId} with ${role} role, you cannot ${action} ${object}`, color: 'red', input });
    }
  }

  return (
    <div className="App">
      <div style={{ color: info.color }}>{info.text}</div>
      <div><button onClick={() => check('admin', 'create', 'order', 'admin')}>Can Admin create order?</button></div>
      <div><button onClick={() => check('admin', 'read', 'order', 'admin')}>Can Admin read order?</button></div>
      <div><button onClick={() => check('user', 'create', 'order', 'user')}>Can User create order?</button></div>
      <div><button onClick={() => check('user', 'read', 'order', 'user')}>Can User read order?</button></div>
        <div><button onClick={() => check('user', 'read', 'dataset', 'admin', {id: "1"})}>Can Admin read dataset 1?</button></div>
        <div><button onClick={() => check('user', 'read', 'dataset', 'admin', {id: "2"})}>Can Admin read dataset 2?</button></div>
        <div><button onClick={() => check('user', 'read', 'dataset', 'admin', {id: "3"})}>Can Admin read dataset 3?</button></div>
        <div><button onClick={() => check('user', 'read', 'dataset', 'admin', {id: "4"})}>Can Admin read dataset 4?</button></div>
        <div><button onClick={() => check('user', 'read', 'dataset', 'user', {id: "1"})}>Can User read dataset 1?</button></div>
        <div><button onClick={() => check('user', 'read', 'dataset', 'user', {id: "2"})}>Can User read dataset 2?</button></div>
        <div><button onClick={() => check('user', 'read', 'dataset', 'user', {id: "3"})}>Can User read dataset 3?</button></div>
        <div><button onClick={() => check('user', 'read', 'dataset', 'user', {id: "4"})}>Can User read dataset 4?</button></div>
        <div><button onClick={() => check('user', 'read', 'dataset', 'user2', {id: "1"})}>Can User2 read dataset 1?</button></div>
        <div><button onClick={() => check('user', 'read', 'dataset', 'user2', {id: "2"})}>Can User2 read dataset 2?</button></div>
        <div><button onClick={() => check('user', 'read', 'dataset', 'user2', {id: "3"})}>Can User2 read dataset 3?</button></div>
        <div><button onClick={() => check('user', 'read', 'dataset', 'user2', {id: "4"})}>Can User2 read dataset 4?</button></div>
      <pre style={{textAlign: 'left'}}>input: {JSON.stringify(info.input, null, 4)}</pre>
    </div>
  );
}

export default App;
