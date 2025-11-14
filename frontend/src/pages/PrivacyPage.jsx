export default function privacyPage() {
  return (
    <div className="flex flex-col items-center px-6 py-10 bg-white min-h-screen">
      <h1 className="font-bold mb-12 text-4xl text-center text-gray-900">
        Integritetspolicy för TODO-APP AB
      </h1>

      <div className="w-full max-w-3xl space-y-6">
        <section className="bg-purple-50 p-6 border-l-4 border-purple-500 shadow-sm">
          <p className="text-gray-800 text-base">
            Välkommen till TODO-APP AB:s integritetspolicy. Vi värnar om din
            personliga integritet och vill vara transparenta med hur vi samlar
            in, använder och skyddar dina uppgifter.
          </p>
        </section>

        <section className="bg-purple-50 p-6 border-l-4 border-purple-500 shadow-sm">
          <h2 className="font-bold mb-3 text-xl text-gray-900">
            Vilka personuppgifter vi samlar in
          </h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>
              <strong>E-postadress</strong> för att skapa och hantera ditt
              konto.
            </li>
            <li>
              <strong>Förnamn och efternamn</strong> för att visa ditt namn på
              hemsidan.
            </li>
            <li>
              <strong>Todo-listor:</strong> de uppgifter du skapar, ändrar eller
              tar bort i appen.
            </li>
          </ul>
        </section>

        <section className="bg-purple-50 p-6 border-l-4 border-purple-500 shadow-sm">
          <h2 className="font-bold mb-3 text-xl text-gray-900">
            Hur vi behandlar uppgifterna
          </h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>
              <strong>E-postadress</strong> används för att identifiera dig och
              koppla dina listor till kontot.
            </li>
            <li>
              <strong>För- och efternamn</strong> är helt frivilligt att ange.
              Om du väljer att lägga till ditt namn behandlas uppgifterna
              baserat på ditt uttryckliga <strong>samtycke</strong>. Du kan när
              som helst ändra eller ta bort namnet i din profil.
            </li>
            <li>
              <strong>Att-göra-uppgifter</strong> lagras för att säkerställa
              tjänstens funktionalitet och ge dig full kontroll över dina
              uppgifter.
            </li>
          </ul>
        </section>

        <section className="bg-purple-50 p-6 border-l-4 border-purple-500 shadow-sm">
          <h2 className="font-bold mb-3 text-xl text-gray-900">
            Personuppgiftsdelning och säkerhet
          </h2>
          <p className="text-gray-800 mb-2">
            {' '}
            Vi delar dina uppgifter endast med parter som är nödvändiga för att
            driva tjänsten, och aldrig med tredje part utan ditt uttryckliga
            medgivande.
          </p>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>
              Hosting-leverantörer och tekniska partners som behövs för
              tjänstens drift.
            </li>
            <li>
              Tredje part endast när det krävs enligt lag eller
              myndighetsbeslut.
            </li>
          </ul>
          <p className="mt-2 italic">
            Dina uppgifter överförs aldrig utanför EU/EES
          </p>
        </section>

        <section className="bg-purple-50 p-6 border-l-4 border-purple-500 shadow-sm">
          <h2 className="font-bold mb-3 text-xl text-gray-900">
            Rättslig grund
          </h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>
              <strong>Avtal (artikel 6.1 b GDPR)</strong>: Behandlingen av
              uppgifter som e-postadress och att-göra-uppgifter är nödvändig för
              att kunna skapa och hantera ditt konto samt tillhandahålla appens
              funktioner.
            </li>
            <li>
              <strong>Samtycke (artikel 6.1 a GDPR)</strong>: Behandlingen av
              ditt namn är frivillig. Om du väljer att ange namn behandlas
              uppgiften med stöd av samtycke, och du kan när som helst ändra
              eller ta bort ditt namn i profilen, vilket också återkallar ditt
              samtycke till den behandlingen.
            </li>
          </ul>
        </section>

        <section className="bg-purple-50 p-6 border-l-4 border-purple-500 shadow-sm">
          <h2 className="font-bold mb-3 text-xl text-gray-900">
            Dina rättigheter
          </h2>
          <p className="text-gray-800 mb-2">Du har rätt att:</p>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>Begära tillgång till de uppgifter vi har om dig</li>
            <li>Begära rättelse, överföring, begränsning eller radering</li>
            <li>Invända mot behandling av dina uppgifter</li>
          </ul>
          <p className="mt-2 text-gray-700 italic">
            Klagomål kan skickas till Integritetsskyddsmyndigheten (IMY)
          </p>
        </section>

        <section className="bg-purple-50 p-6 border-l-4 border-purple-500 shadow-sm">
          <h2 className="font-bold mb-3 text-xl text-gray-900">Lagringstid</h2>
          <p className="text-gray-800 mb-2">
            Vi sparar dina personuppgifter endast så länge du har ett konto hos
            oss. När du raderar ditt konto tas alla uppgifter bort från våra
            system.
          </p>
        </section>

        <section className="bg-purple-50 p-6 border-l-4 border-purple-500 shadow-sm">
          <h2 className="font-bold mb-3 text-xl text-gray-900">Kontakt</h2>
          <p className="text-gray-800">
            Personuppgiftsansvarig: TODO-APP AB <br />
            Adress: Todo gatan 3 <br />
            Organisationsnummer: 0945894754479 <br />
            E-post:{' '}
            <span className="text-blue-700 underline hover:text-blue-900">
              support@todo.se
            </span>{' '}
            <br />
            Dataskyddsombud:{' '}
            <span className="text-blue-700 underline hover:text-blue-900">
              dataskydd@todo.se
            </span>
          </p>
        </section>
      </div>
    </div>
  );
}
