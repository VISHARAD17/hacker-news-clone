
const ArticleCard = ({article}) => {
    if(!article.title) return null;
    return (
        <div className="bg-blue-100 m-4 p-3 rounded-lg text-center w-[1000px] ml-auto mr-auto hover:bg-blue-300">
            <h3 className="font-semibold">{article.title}</h3>
            <a className="hover:text-blue-600" href = {article.url} target = '__blank'>Read more ...</a>
        </div>
    );
}
 
export default ArticleCard;