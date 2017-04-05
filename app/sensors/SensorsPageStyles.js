import { StyleSheet } from 'react-native';

let Styles = StyleSheet.create({
  description: {
    marginBottom: 30,
    fontSize: 18,
    textAlign: 'center',
    color: '#ec1'
  },
  copyright: {
    fontSize: 20,
    color: '#ec1',
    position: 'absolute',
    bottom: 0,
  },
  container: {
    padding: 30,
    paddingTop: 50,
    marginTop: 30,
    alignItems: 'center',
    height: 200
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center',
    textAlign: 'center',
    width: 200,
    height: 30,
    borderColor: '#000',
    borderWidth: 2
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    justifyContent: 'center'
},
buttonLocation: {
  height: 40,
  width: 400,
  backgroundColor: '#48aa3C',
  borderColor: '#48aa3C',
  borderWidth: 1,
  borderRadius: 20,
  justifyContent: 'center'
},
buttonUpload: {
  height: 50,
  width: 200,
  backgroundColor: '#48ff3C',
  borderColor: '#48ff3C',
  borderWidth: 1,
  borderRadius: 5,
  justifyContent: 'center',
  marginTop: 50
},
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 4,
    color: '#48BBEC'
  },
  image: {
    width: 200,
    height: 100
  }
});

module.exports = Styles;
