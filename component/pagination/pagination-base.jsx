var React = require('react');
var _ = require('underscore');
var classNames = require('classnames');

var PaginationBase = React.createClass({
  getDefaultProps() {
    return {
      pageCount: 5,
      pageIndex: 1,
      range: 2
    };
  },
  getInitialState() {
    return {
      pageIndex: this.props.pageIndex
    }
  },
  goToPage(index) {
    this.setState({
      pageIndex: index
    });
  },
  prevPage() {
    this.setState({
      pageIndex: this.state.pageIndex - 1
    });
  },
  nextPage() {
    this.setState({
      pageIndex: this.state.pageIndex + 1
    });
  },
  render() {
    var { range, pageCount } = this.props;
    var { pageIndex } = this.state;
    var result = [];
    if (pageCount < 5) {
      result = _.range(1, pageCount + 1);
    }
    if (pageCount > 5) {

    }
    return (
      <nav className="Pagination-base">
        <ul className="pagination pagination-sm">
          <li>
            <a onClick={this.prevPage} aria-label="Previous">
              <span>&laquo;</span>
            </a>
          </li>
          {result.map(page =>
            <li className={classNames({active: page == pageIndex})} key={_.uniqueId('Pagination-li-')}>
              <a onClick={event => {this.goToPage(page)}}>{page}</a>
            </li>
          )}
          <li>
            <a onClick={this.nextPage} aria-label="Next">
              <span>&raquo;</span>
            </a>
          </li>
        </ul>
        <br/>
        <ul className="pagination pagination-sm">
          <li className="disabled">
            <a href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li><a href="#">1</a></li>
          <li className="page-separator"><a href="#">...</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">4</a></li>
          <li><a href="#">5</a></li>
          <li className="active"><a href="#">6</a></li>
          <li><a href="#">7</a></li>
          <li><a href="#">8</a></li>
          <li><a href="#">9</a></li>
          <li><a href="#">10</a></li>
          <li className="page-separator"><a href="#">...</a></li>
          <li><a href="#">21</a></li>
          <li>
            <a href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
});

module.exports = PaginationBase;