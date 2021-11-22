interface RepositroryItemProps {
  repository: {
    name: string;
    description: string;
    html_url: string;
  };
}

export function RepositroryItem(props: RepositroryItemProps) {
  return (
    <li>
      <strong>{props.repository.name}</strong>
      <p>{props.repository.description}</p>
      <a href={props.repository.html_url}>Acessar repositorio</a>
    </li>
  );
}
