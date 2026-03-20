import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
// 1. Add this import for the Authenticator hook
import { useAuthenticator } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

function App() {
  // 2. Access the signOut function and user data
  const { user, signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <main>
      {/* 3. Show the user's email/username at the top */}
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
            {todo.content}
          </li>
        ))}
      </ul>
      
      {/* 4. Add the Sign Out button */}
      <button onClick={signOut} style={{ marginTop: '20px' }}>Sign out</button>

      <div>
        🥳 App successfully hosted. Try creating a new todo.
      </div>
    </main>
  );
}

export default App;