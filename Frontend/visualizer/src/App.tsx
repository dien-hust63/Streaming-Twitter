import React from "react";
import { AppProvider } from "./contexts/app-context";
import { DataProvider } from "./contexts/data-context";
import Layout from "./layout";
import Page from "./page";
export default function App() {
  return (
    <AppProvider>
      <DataProvider>
        <Layout>
          <Page />
        </Layout>
      </DataProvider>
    </AppProvider>
  );
}
