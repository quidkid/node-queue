"use strict";
/* eslint-env jasmine */

var Queue = require('./queue').Queue;
var _ = require('underscore');

// --------------------TESTS--------------------
// We've implemented one test suite for you that covers end-to-end
// functionality at the bottom.
// You're responsible for writing the test cases for each function().
var queue = new Queue();
describe("Queue.prototype.isEmpty", function() {
  // YOUR CODE HERE
  it("Queue should be empty", function() {
    expect(queue.isEmpty()).toBe(true);
  })
});

describe("Queue.prototype.getSize", function() {
  // YOUR CODE HERE
  it("Empty Queue should have a size of zero", function() {
    expect(queue.getSize()).toBe(0);
  })
});

describe("Queue.prototype.push", function() {
  // YOUR CODE HERE
  it("Empty Queue pushed with one element should have a size of 1", function() {
    queue.push(1);
    expect(queue.getSize()).toBe(1);
  })

  it("Empty Queue pushed with two elements should have a size of 2", function() {
    var queue1 = new Queue();
    queue1.push(1);
    queue1.push(1);
    expect(queue1.getSize()).toBe(2);
  })

  it("Empty Queue pushed with 5 elements should have a size of 5", function() {
    var queue1 = new Queue();
    queue1.push(1);
    queue1.push(1);
    queue1.push(1);
    queue1.push(1);
    queue1.push(1);
    expect(queue1.getSize()).toBe(5);
  })

});

describe("Queue.prototype.pop", function() {
  // YOUR CODE HERE
  it("Empty Queue pushed with two elements should have a size of 2", function() {
    var queue1 = new Queue();
    queue1.push(1);
    queue1.push(1);
    expect(queue1.pop()).toBe(1);
  })

  it("Empty Queue pushed with two elements should have a size of 2", function() {
    var queue1 = new Queue();
    queue1.push(2);
    queue1.push(1);
    expect(queue1.pop()).toBe(2);
    expect(queue1.getSize()).toBe(1);
  })
});

describe("Queue.prototype.contains", function() {
  // YOUR CODE HERE
  it("Empty Queue pushed with 5 elements should contain a 2", function() {
    var queue1 = new Queue();
    queue1.push(1);
    queue1.push(2);
    queue1.push(1);
    queue1.push(1);
    queue1.push(1);
    expect(queue1.contains(2)).toBe(true);
  })
});

describe("Queue.prototype.peek", function() {
  // YOUR CODE HERE
  it("Empty Queue pushed with 5 elements should have a head of 1", function() {
    var queue1 = new Queue();
    queue1.push(1);
    queue1.push(2);
    queue1.push(1);
    queue1.push(1);
    queue1.push(1);
    expect(queue1.peek()).toBe(1);
  })

  it("Empty Queue should have a head of null", function() {
    var queue1 = new Queue();
    expect(queue1.peek()).toBe(null);
  })
});

// This one's a bonus
describe("Queue.prototype.forEach", function() {
  // YOUR CODE HERE
  it("Empty Queue pushed with 5 should have a head of 10", function() {
    var queue1 = new Queue();
    queue1.push(5);
    queue1.forEach(function(x){
        console.log("value before"+x.value)
        x.value = x.value + 5;
        console.log("value after"+x.value)
    })
    expect(queue1.peek()).toBe(10);
  })
});


describe("Queue end-to-end", function() {
  it("Push 100 items to queue, then pop them back out, items should come out in same order", function() {
    var q = new Queue();

    // Generate 100 random numbers
    var input = _.range(100).map(_.partial(_.random, 10000));

    // Push numbers to queue
    _.forEach(input, function(item) {
      q.push(item);
    });

    // Pop all numbers from queue
    var out = [];
    while (! q.isEmpty()) {
      out.push(q.pop());
    }

    // Items should come out in the order pushed
    expect(input).toEqual(out);
  });
  it("Push and pop the same 2 items 10 times, check that values are updated properly", function() {
    debugger;
    var q = new Queue();
    _.forEach(_.range(10), function() {
      // Should start out empty
      expect(q.getSize()).toBe(0);
      expect(q.isEmpty()).toBe(true);
      expect(q.contains('x')).toBe(false);
      expect(q.contains('y')).toBe(false);

      // Add x, check contents, check size
      q.push('x');
      expect(q.contains('x')).toBe(true);
      expect(q.contains('y')).toBe(false);
      expect(q.getSize()).toBe(1);

      // Add x, check contents, check size
      q.push('y');
      expect(q.contains('x')).toBe(true);
      expect(q.contains('y')).toBe(true);
      expect(q.getSize()).toBe(2);

      // Pop x, check contents, check size
      expect(q.pop()).toBe('x');
      expect(q.contains('x')).toBe(false);
      expect(q.contains('y')).toBe(true);
      expect(q.getSize()).toBe(1);

      // Pop y, check empty
      expect(q.pop()).toBe('y');
      expect(q.contains('x')).toBe(false);
      expect(q.contains('y')).toBe(false);
      expect(q.getSize()).toBe(0);
      expect(q.isEmpty()).toBe(true);
    })
  });

  it("Bonus: queue should be faster than an array for adding to the beginning", function() {
    // Run a function multiple times and measure time taken to run
    function time(fun) {
      var start = Date.now();
      _.range(1000).map(fun);
      return Date.now() - start;
    }

    function array() {
      var array = [];
      _.range(1000).forEach(function(item) {
        array.unshift(item);
      });
    }

    function queue() {
      var q = new Queue();
      _.range(1000).forEach(function(item) {
        q.push(item);
      });
    }

    var arrayTime = time(array);
    var queueTime = time(queue);
    // Array time should be greater, meaning it took longer, i.e. it was slower
    console.log('Queue time: %s Array time: %s', queueTime, arrayTime);
    expect(arrayTime > queueTime).toBe(true);
  });
});

