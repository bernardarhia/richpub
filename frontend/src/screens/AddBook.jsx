import AdminNav from "../components/main/AdminNav";
import Wrapper from "../components/main/Wrapper";
import Input from "../components/sub/Input";
import Button from "../components/sub/Button";
import ItemTitle from "../components/sub/ItemTitle";
import MessageBox from "../components/sub/MessageBox";
const AddBook = () => {
  return (
    <>
      <AdminNav />
      <Wrapper>
        <ItemTitle>Add Book</ItemTitle>
        <form>
          <div className="input-container">
            <label htmlFor="name">Title</label>
            <Input
              className="input-regular"
              placeholder="Book Title"
              type="text"
            />
          </div>
          <div className="input-container">
            <label htmlFor="price">Price</label>
            <Input
              className="input-regular"
              placeholder="Book Price"
              type="number"
            />
          </div>
          <div className="input-container">
            <label htmlFor="description">Description</label>
            <MessageBox
              className="message-box"
              placeholder="Book Description"
              row="4"
              col="10"
            />
            <label htmlFor="file" className="input-regular file-label">
              <Input id="file" type="file" />
              Choose Book Image
            </label>
          </div>
          <div className="input-container">
            {" "}
            <Button className="btn btn-blue btn-medium btn-full small-border">
              {" "}
              Record Book
            </Button>
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default AddBook;
