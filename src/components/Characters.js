import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Segment, Header, Grid, Card, Icon, Image } from 'semantic-ui-react';

class Characters extends Component {
  state = { characters: [] }

  componentDidMount() {
    axios.get('https://api.got.show/api/characters')
      .then(res => {
        console.log(res.data);
        this.setState({ characters: res.data })
      })
      .catch(err => {
        // TODO: handle client side errors better. Maybe a use the Flash Component?
        console.log(err.response);
    });
  }
  
  render() {
    const { characters } = this.state;
    return(
      <Segment>
        <Header as='h1' textAlign='center'>Game of Thrones</Header>
        <hr />
        <Header as='h2' textAlign='center' style={{ marginBottom: '2%' }}>Characters</Header>
        <Grid stackable>
        {
          characters.map(character => {
            const { name, books, house } = character;
            return(
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      { name }
                    </Card.Header>
                    <Card.Description>
                      Appears in "{ books }"
                    </Card.Description>
                  </Card.Content>
                    <Card.Content extra>
                    <a>
                    <Icon name='user' />
                    { house != null ? house : 'No House' }
                    </a>
                  </Card.Content>
                </Card>
              </Grid.Column>
            )
          })
        }
        </Grid>
      </Segment>
    );
  }
}

export default connect()(Characters);