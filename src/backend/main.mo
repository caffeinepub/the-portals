import Text "mo:core/Text";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Nat "mo:core/Nat";

actor {
  type Provider = {
    name : Text;
    category : Text;
  };

  module Provider {
    public func compareByCategory(provider1 : Provider, provider2 : Provider) : Order.Order {
      Text.compare(provider1.category, provider2.category);
    };
  };

  type Task = {
    id : Nat;
    providerName : Text;
    category : Text;
    escrowFrozen : Bool;
    optionalHandshakeKey : ?Nat;
    optionalRating : ?Nat;
  };

  module Task {
    public func compareByCategory(task1 : Task, task2 : Task) : Order.Order {
      Text.compare(task1.category, task2.category);
    };
  };

  let providers = Map.empty<Text, Provider>();
  let tasks = Map.empty<Nat, Task>();

  var nextTaskId = 0;

  public shared ({ caller }) func registerProvider(name : Text, category : Text) : async () {
    if (providers.containsKey(name)) { Runtime.trap("Provider already registered.") };
    let provider : Provider = {
      name;
      category;
    };
    providers.add(name, provider);
  };

  public query ({ caller }) func getProvider(name : Text) : async Provider {
    switch (providers.get(name)) {
      case (null) { Runtime.trap("Provider not found.") };
      case (?provider) { provider };
    };
  };

  public query ({ caller }) func getAllProviders() : async [Provider] {
    providers.values().toArray();
  };

  public query ({ caller }) func getProvidersByCategory() : async [Provider] {
    providers.values().toArray().sort(Provider.compareByCategory);
  };

  public shared ({ caller }) func createTask(providerName : Text, category : Text) : async Nat {
    let taskId = nextTaskId;
    nextTaskId += 1;

    let task : Task = {
      id = taskId;
      providerName;
      category;
      escrowFrozen = true;
      optionalHandshakeKey = null;
      optionalRating = null;
    };

    tasks.add(taskId, task);
    taskId;
  };

  public shared ({ caller }) func generateHandshakeKey(taskId : Nat) : async Nat {
    let randomKey = 1234; // Will get random value from ts / js agent anyway.

    switch (tasks.get(taskId)) {
      case (null) { Runtime.trap("Task not found.") };
      case (?task) {
        if (task.escrowFrozen) {
          let updatedTask : Task = {
            id = task.id;
            providerName = task.providerName;
            category = task.category;
            escrowFrozen = task.escrowFrozen;
            optionalHandshakeKey = ?randomKey;
            optionalRating = task.optionalRating;
          };
          tasks.add(taskId, updatedTask);
          randomKey;
        } else {
          Runtime.trap("Escrow not frozen.");
        };
      };
    };
  };

  public shared ({ caller }) func verifyHandshake(taskId : Nat, key : Nat) : async Bool {
    switch (tasks.get(taskId)) {
      case (null) { Runtime.trap("Task not found.") };
      case (?task) {
        switch (task.optionalHandshakeKey) {
          case (null) { Runtime.trap("Handshake key not generated.") };
          case (?storedKey) {
            if (storedKey == key) {
              let updatedTask : Task = {
                id = task.id;
                providerName = task.providerName;
                category = task.category;
                escrowFrozen = false;
                optionalHandshakeKey = null;
                optionalRating = task.optionalRating;
              };
              tasks.add(taskId, updatedTask);
              true;
            } else {
              Runtime.trap("Invalid handshake key.");
            };
          };
        };
      };
    };
  };

  public shared ({ caller }) func rateTask(taskId : Nat, rating : Nat) : async () {
    if (rating < 1 or rating > 5) { Runtime.trap("Rating must be between 1 and 5.") };

    switch (tasks.get(taskId)) {
      case (null) { Runtime.trap("Task not found.") };
      case (?task) {
        if (not task.escrowFrozen) {
          let updatedTask : Task = {
            id = task.id;
            providerName = task.providerName;
            category = task.category;
            escrowFrozen = task.escrowFrozen;
            optionalHandshakeKey = task.optionalHandshakeKey;
            optionalRating = ?rating;
          };
          tasks.add(taskId, updatedTask);
        } else {
          Runtime.trap("Cannot rate task while escrow is frozen.");
        };
      };
    };
  };

  public query ({ caller }) func getAllTasks() : async [Task] {
    tasks.values().toArray();
  };

  public query ({ caller }) func getTasksByCategory() : async [Task] {
    tasks.values().toArray().sort(Task.compareByCategory);
  };
};
