import { Link } from "react-router-dom";

const getTitle = (note) => {
  const title = note.body.split("\n")[0];
  if (title.length > 40) {
    return title.slice(0, 40) + '...';
  }
  return title;
};

const getContent = (note) => {
  let title = getTitle(note);
  let content = note.body.replaceAll('\n', '');
  content = content.replaceAll(title,'')

  if(content.length > 40) {
    return content.slice(0,45) + '...'
  }else{
    return content
  }
};

const getData = (data) => {
  return new Date(data.updated).toLocaleDateString();
};

function ListItem({ note }) {
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p>
          <span>{getData(note)}</span>
          {getContent(note)}
        </p>
      </div>
    </Link>
  );
}

export default ListItem;
