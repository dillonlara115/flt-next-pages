import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore/lite';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group, MantineProvider, NavLink } from '@mantine/core';
import { theme } from '../theme';
import firestore from '@/firestore';

// Define the type of the users state variable
interface User {
  id: string;
  email: string
  first_name: string;
  last_name: string;
}

export default function App({ Component, pageProps }: AppProps) {
  const [opened, { toggle }] = useDisclosure();
  const [users, setUsers] = useState<User[]>([]); // Add type annotation to useState

  // Get a list of users from your database
  async function getUsers() {
    const usersCol = collection(firestore, 'users');
    const usersSnapshot = await getDocs(usersCol);
    const userList = usersSnapshot.docs.map(doc => doc.data() as User); // Cast to User type
    return userList;
  }

  useEffect(() => {
    // Fetch users data on component mount
    getUsers().then((userList) => setUsers(userList));
  }, []);

  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>FTL</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          Food Truck Lineup
              <NavLink label="Link 1" to="/" />
              <NavLink label="Link 2" to="/page2" />
              <NavLink label="Link 3" to="/page3" />
              <NavLink label="Link 4" to="/page4" />
              <NavLink label="Link 5" to="/page5" />
              <NavLink label="Link 6" to="/page6" />
             <ul>
              {users.map((user) => (
                <li key={user.id}>{user.first_name} {user.last_name}</li>
              ))}
             </ul>
        </AppShell.Navbar>
        <AppShell.Main>
          <Component {...pageProps} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
