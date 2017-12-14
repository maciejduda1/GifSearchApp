App = React.createClass({
    getInitialState: function() {
        return {
        loading: false,
        searchingText: '',
        gif: {}
        };
    },
    handleSearch: function(searchingText) {  // 1.
        this.setState({
        loading: true  // 2.
        });
        this.getGif(searchingText, function(gif) {  // 3.
            this.setState({  // 4
            loading: false,  // a
            gif: gif,  // b
            searchingText: searchingText  // c
            });
        }.bind(this));
    },

    getGif: function (searchingText, callback){
        var GIPHY_PUB_KEY = 'K46YHN7qqvn25z8YPHX6Za4NytsHqR36';
        var url = 'http://api.giphy.com/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        function makePromise(url){
            return new Promise (
                function(resolve, reject){
                const request = new XMLHttpRequest();
                request.onload = function(){
                    if (this.status === 200){
                        //console.log(this);
                       resolve(this.response);
                    } else {
                        reject(new Error(this.statusText));
                    }
                };
                request.onerror = function(){
                    reject(new Error(
                        `XMLHttpRequest Error: ${this.statusText} `));
                };
                request.open('GET', url);
                request.send();
            }
        );
    } 
    makePromise(url)
    .then(response => {
       // console.log(response);
        var data = JSON.parse(response.responseText).data; // 4.
        var gif = {  // 5.
            url: data.fixed_width_downsampled_url,
            sourceUrl: data.url
        };
        callback(gif);  // 6.
    })
   // .catch(error => console.error('Something went wrong', error));
},
    
    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };
        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow! </h1>
                <p>Znajdź gifa na <a href={'http://giphy.com'}> giphy </a> Naciskaj enter, aby pobrać kolejne gify.</p>
               <Search 
                    onSearch={this.handleSearch}
                />
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
          </div>
        );
    }
});