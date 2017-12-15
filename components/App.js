App = React.createClass({
    getInitialState: function() {
        return {
        loading: false,
        searchingText: '',
        gif: {}
        };
    },
    handleSearch: function(searchingText) {  
        this.setState({
            loading: true  
        });
        this.getGif(searchingText)
            .then(response => {         //zaczeka na response!
                console.log(JSON.parse(response));
                return JSON.parse(response); // parsedResponse 

            })
            .then(parsedResponse => {
                var data = parsedResponse.data;
                var gif = {
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                this.setState({  
                    loading: false,  
                    gif: gif,  
                    searchingText: searchingText  
                });
            })
            .catch(() => {
                console.log('Error');
            })    
    },

    getGif: function (searchingText){
        var GIPHY_PUB_KEY = 'K46YHN7qqvn25z8YPHX6Za4NytsHqR36';
        var url = 'http://api.giphy.com/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        return new Promise(                                              // Ta funkcja zwraca odpowiedź z servera ale po jej otrzymaniu!
            function(resolve, reject){
                const request = new XMLHttpRequest();
                request.onload = function(){
                    if (this.status === 200){
                        resolve(this.response);
                    } else {
                        reject(new Error(this.statusText));
                    }
                };
                request.onerror = function(){
                    reject(new Error(this.statusText));
                };
                request.open('GET', url);
                request.send();
            }
        );
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