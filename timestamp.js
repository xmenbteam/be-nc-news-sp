function timestamp(unixTime) {
    const date = new Date(unixTime).toString();
    console.log(date);
    return date;
}

timestamp(1542284514171);
