import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const Funs = [
    "Fun 1",
    "Fun 2",
    "Fun 3",
    "Fun 5",
    "Fun 6",
    "Fun 7",
    "Fun 8",
    "Fun 9",
    "Fun 10",
    "Fun 11",
    "Fun 12",
    "string",
  ];
  const [inputPage, setInputPage] = useState();
  const [shopValue, setShopValue] = useState(" ");
  const[typeErr,setTypeErr] =useState(" ");
  const [currentPage, setCurrentPage] = useState(1);
  const [numberPage, setNumberPage] = useState();
  const [listErr, setListErr] = useState([]);
  if (currentPage <= 0) {
    setCurrentPage(1);
  }

  const hanldeCreate = () => toast.success("Wow so easy!");
  if (currentPage > numberPage) {
    setCurrentPage(numberPage);
  }
  const handleClickPage = (index) => {
    setCurrentPage(index);
  };

  const handleInputPage = (e) => {
    setInputPage(e);
  };
  const handleFilterShop = (e) => {
    setShopValue(e);
  };
  const handleFilterTypeErr = (e) => {
    setTypeErr(e);
  };


  const hanldeSearch = () => {
    setCurrentPage(inputPage);
    console.log("done");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7156/filter?shop="+
           shopValue+
              "&"+
           "typeError="+typeErr+
           "&pageNumber="+ currentPage+"&pageSize=8"
        );
    
        
        setListErr(response.data.items);
    

        setNumberPage(response.data.totalPages);
        // setNumberPage(11);
      } catch (error) {
        console.error("loi khi lay du lieu", error);
      }
    };
    fetchData();
  
  }, [currentPage,shopValue,typeErr]);

  return (
    <>
      <div class="container">
        <div class="input-group">
          <label htmlFor="time">Thời gian</label>
          <select className="time">
            <option value="option1">Tháng 1</option>
            <option value="option2">Tháng 2</option>
          </select>
        </div>
        <div class="input-group">
          <label htmlFor="shop">Cửa hàng</label>
          <select
            onChange={(e) => handleFilterShop(e.target.value)}
            placeholder="Cửa hàng"
            value={shopValue}
            // onChange={(e) => setShopValue(e.target.value)}
            className="shop"
          >
            {Funs.map((fun) => (
              <option value={fun}>{fun}</option>
            ))}
          </select>
        </div>
        <div class="input-group">
          <label htmlFor="typeError">Kiểu lỗi </label>
          <select className="typeError" value={typeErr} onChange={(e)=>handleFilterTypeErr(e.target.value)}>
            <option value="Bộ nhận tiền">Bộ nhận tiền</option>
            <option value="Máy ảnh">Máy ảnh</option>
          </select>
        </div>
        {/* <div class="btn-filter">
          <button onClick={handleFilter} class="btn">Lọc</button>
        </div> */}
        <div class="btn-add">
          <button onClick={hanldeCreate} class="btn">
            Thêm mới
          </button>
        </div>
      </div>

      <table>
        <thead>
          {}
          <tr>
            <th>Cửa hàng</th>
            <th>Người báo lỗi</th>
            <th>Thời gian báo lỗi</th>
            <th>Loại lỗi</th>
            <th>Người kiểm tra lỗi</th>
            <th>Thông tin chính xác lỗi</th>
            <th>Nguyên nhân</th>
            <th>Cách xử lý</th>
          </tr>
        </thead>
        <tbody>
 

        {listErr ? (
  listErr.map((err) => (
    <tr>
      <td>{err.shop}</td>
      <td className="reporter">{err.issueReporter}</td>
      <td className="date">{err.timeReport}</td>
      <td>{err.descriptionError}</td>
      <td>{err.errorChecker}</td>
      <td className="detailErr">{err.errorDetails}</td>
      <td className="causeErr">{err.rootCause}</td>
      <td className="solutionErr">{err.solution}</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="8">Không có dữ liệu</td>
  </tr>
)}
   
        </tbody>
      </table>
      {numberPage > 10 ? (
        <div className="pagination">
          {/* <li><a onClick={handleClickPrev}>Trước</a></li> */}
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index}>
              {index + 1 == currentPage ? (
                <li className="active">
                  <a
                    onClick={(index) => handleClickPage(index.target.innerText)}
                  >
                    {index + 1}
                  </a>
                </li>
              ) : (
                <li>
                  <a
                    onClick={(index) => handleClickPage(index.target.innerText)}
                  >
                    {index + 1}
                  </a>
                </li>
              )}
            </div>
          ))}
          <li>
            <input
              onChange={(e) => handleInputPage(e.target.value)}
              placeholder="...."
              className="pageInput"
            ></input>
          </li>
          <li>
            <a onClick={hanldeSearch}>Tìm trang</a>
          </li>
        </div>
      ) : (
        <div className="pagination">
          {/* <li><a onClick={handleClickPrev}>Trước</a></li> */}
          {Array.from({ length: numberPage }, (_, index) => (
            <div key={index}>
              {index + 1 == currentPage ? (
                <li className="active">
                  <a
                    onClick={(index) => handleClickPage(index.target.innerText)}
                  >
                    {index + 1}
                  </a>
                </li>
              ) : (
                <li>
                  <a
                    onClick={(index) => handleClickPage(index.target.innerText)}
                  >
                    {index + 1}
                  </a>
                </li>
              )}
            </div>
          ))}
          {/* <li><a onClick={handleClickNext}>Sau</a></li> */}
        </div>
      )}
    </>
  );
}

export default App;
