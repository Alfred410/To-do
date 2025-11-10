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
              <strong>Task / Todo-listor:</strong> de uppgifter du skapar,
              ändrar elelr tar bort på hemsidan.
            </li>
          </ul>
        </section>

        <section className="mb-10 text-sm">
          <h2 className="font-semibold mb-3 text-lg">
            Hur vi behandlar uppgifterna
          </h2>
          <p className="mb-3">
            Vi behandlar dina uppgifter för att kunna tillhandahålla hemsidans
            funktioner och säkerställa att tjänsten fungerar korrekt.
          </p>
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
              kunna använda tjänsten fullt ut.
            </li>
          </ul>
          <p className="underline pl-4">
            Vi sparar endast uppgifter så länge du har ett konto. När du raderar
            ditt konto tas alla uppgifter bort.
          </p>
        </section>

        <section className="text-sm mb-10">
          <h2 className="font-semibold mb-3 text-lg">
            Personuppgiftsdelning och säkerhet
          </h2>
          <p>Vi delar dina uppgifter endast med:</p>
          <ul className="list-inside pl-4">
            <li>
              Hosting-leverantörer och tekniska partners som behövs för
              tjänsten.
            </li>
            <li>Tredje part om vi ör syldiga enligt lag.</li>
          </ul>
          <p className="mt-2">Dina uppgifter överförs aldrig utanför EU/EES</p>
        </section>

        <section className="text-sm mb-10">
          <h2 className="font-semibold mb-3 text-lg">Dina rättigheter</h2>
          <p>Du har rätt att kontakta oss för att:</p>
          <ul className="list-inside pl-4">
            <li>Få ut information om de upggifter vi har om dig</li>
            <li>
              Begära rättelse, överföring, begränsning, invändning eller
              radering
            </li>
          </ul>
          <p>Klagomål kan skickas till Integritetsskyddsmyndigheten (IMY)</p>
        </section>

        <section className="text-sm">
          <h2 className="font-semibold mb-3 text-lg">Kontakt</h2>
          <p>
            Personuppgiftsansvarig: TODO-APP AB <br />
            Adress: Todo gatan 3 <br />
            Organisationsnummer: 0945894754479 <br />
            E-post/Telefon{' '}
            <span className="text-blue-600 underline hover:text-blue-800">
              support@todo.se
            </span>
          </p>
          <p>
            Dataskyddsombud nås på:{' '}
            <span className="text-blue-600 underline hover:text-blue-800">
              dataskydd@todo.se
            </span>
          </p>
        </section>
      </div>
    </div>
  );
}
