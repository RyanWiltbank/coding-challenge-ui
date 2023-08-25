export class FishAPI {

  goFish(apiKey) {
    const url = `http://localhost:5001/gofish?apikey=${apiKey}&NOAAFisheriesRegion="Alaska"`;

    return fetch(url)
      .then(res => {
        if (!res.ok) {
          alert('Error when calling the api')
        }

        return res.json()
      })
      .then(data => data);
  }
}
