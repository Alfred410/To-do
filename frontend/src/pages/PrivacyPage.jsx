export default function privacyPage() {
  return (
    <div
      className="flex flex-col  items-center px-6 py-10
    "
    >
      <h1 className="font-bold mb-8 text-3xl text-center">Integritetspolicy</h1>

      <div>
        <section className="mb-10 text-sm">
          <h2 className="font-semibold mb-3 text-lg">
            Personuppgifter vi samlar in
          </h2>
          <p className="mb-3">
            När du använder vår tjänst samlar vi in följande upggifter:
          </p>

          <ul className=" list-inside  pl-4">
            <li>
              <strong>E-postadress</strong> för att skapa och hantera ditt
              konto.
            </li>
            <li>
              <strong>Förnamn och efternamn</strong> för att visa ditt namn på
              hemsidan.
            </li>
            <li>
              <strong>Todo-listor och uppgifter</strong> för att du ska kunna
              använda hemsidans funktioner
            </li>
          </ul>
        </section>

        <section className="mb-10 text-sm">
          <h2 className="font-semibold mb-3 text-lg">
            Hur vi behandlar uppgifterna
          </h2>
          <ul className=" list-inside  pl-4">
            <li>
              <strong>E-postadress</strong> används för att identifiera dig och
              koppla dina listor till kontot.
            </li>
            <li>
              <strong>För och efternamn</strong> används endast för att visa
              ditt namn på hemsidan och delas inte med andra.
            </li>
            <li>
              <strong>Todo-listor och uppgifter</strong> sparas för att du ska
              kunna använda tjänsten
            </li>
          </ul>
          <p className="underline pl-4">
            Vi sparar endast uppgifter så länge du har ett konto. När du raderar
            ditt konto tas alla uppgifter bort.
          </p>
        </section>

        <section className="text-sm">
          <h2 className="font-semibold mb-3 text-lg">Kontakt</h2>
          <p>
            Om du har frågor hur vi hanterar din uppgifter kan du kontakta oss
            via e-post:{' '}
            <span className="text-blue-600 underline hover:text-blue-800">
              support@todo.se
            </span>
          </p>
        </section>
      </div>
    </div>
  );
}
