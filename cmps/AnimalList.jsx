export function AnimalList({ animalInfos }) {
  if (!animalInfos) return <span>animalInfos not has been passed</span>;

  return (
      <table className="animalTable">
          <tbody>
              {animalInfos.map((animal) => (
                  <tr key={animal.type}>
                      <td>{animal.type}</td>
                      <td>{animal.count}</td>
                      <td> 
                        <a target='_blank' href={`https://www.google.com/search?q=${encodeURIComponent(animal.type)}`}>
                        search
                    </a></td>
                  </tr>
              ))}
          </tbody>
      </table>
  );
}